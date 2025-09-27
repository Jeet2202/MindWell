require('dotenv').config(); // Load API key
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.static('public'));
app.use(express.json());

// Socket.io for video + transcript
io.on('connection', socket => {
    console.log('User connected: ' + socket.id);

    socket.on('join-room', roomId => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', socket.id);

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', socket.id);
        });
    });

    socket.on('signal', data => {
        io.to(data.to).emit('signal', { from: socket.id, signal: data.signal });
    });

    socket.on('transcript', data => {
        io.to(data.room).emit('receive-transcript', data.transcript);
    });
});

// ✅ AI report endpoint
app.post('/generate-report', async (req, res) => {
    const { transcript } = req.body;
    if (!transcript) {
        return res.status(400).json({ error: "Transcript required" });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // lighter + cheaper model, or use "gpt-4"
            messages: [
                {
                    role: "system",
                    content: "You are an assistant that generates professional counselor session reports.",
                },
                {
                    role: "user",
                    content: `Create a professional counselor session report based on the following student transcript:\n\n${transcript}\n\nFormat it as:\n- Session Summary\n- Key Observations\n- Recommendations`
                }
            ]
        });

        const report = completion.choices[0]?.message?.content?.trim();
        if (!report) {
            return res.status(500).json({ error: "AI did not return a report" });
        }

        res.json({ report });
    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({ error: "Error generating AI report" });
    }
});

// Start server
http.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));
