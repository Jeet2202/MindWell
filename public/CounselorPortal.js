const socket = io();
let localStream, peerConnection;
let currentRoomId = null;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

const joinBtn = document.getElementById('joinBtn');
const roomInput = document.getElementById('roomId');
const studentVideo = document.getElementById('studentVideo');
const counselorVideo = document.getElementById('counselorVideo');
const transcriptDiv = document.getElementById('transcript');

// Listen for signals from student (set up once)
socket.on('signal', async (data) => {
    if (!peerConnection) return;
    
    try {
        if (data.signal.type === 'answer') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
        } else if (data.signal.candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
        }
    } catch (error) {
        console.error('Error handling signal:', error);
    }
});

// Receive transcript (set up once)
socket.on('receive-transcript', transcript => {
    transcriptDiv.innerText = transcript;
});

joinBtn.onclick = async () => {
    const roomId = roomInput.value.trim();
    if (!roomId) return alert("Enter Room ID");

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        counselorVideo.srcObject = localStream;
        currentRoomId = roomId;

        socket.emit('join-room', roomId);

        peerConnection = new RTCPeerConnection(config);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.ontrack = (event) => {
            studentVideo.srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('signal', { room: roomId, signal: event.candidate });
            }
        };

        // Create offer and send to student
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('signal', { room: roomId, signal: offer });
    } catch (error) {
        console.error('Error joining room:', error);
        alert('Failed to access camera/microphone: ' + error.message);
    }
};

document.getElementById('toggleVideo').onclick = () => {
    if(localStream) localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
};
document.getElementById('toggleAudio').onclick = () => {
    if(localStream) localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
};

// AI report generation
document.getElementById('generateReport').onclick = async () => {
    const transcript = transcriptDiv.innerText;
    if(!transcript) return alert("No transcript to generate report");

    try {
        const response = await fetch('/generate-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript })
        });
        const data = await response.json();
        const reportText = data.report + `\n\nSignature: ${prompt("Enter counselor signature")}`;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(reportText, 10, 10);
        doc.save("session_report.pdf");

    } catch (err) {
        console.error(err);
        alert("Failed to generate report");
    }
};