const socket = io();
let localStream, peerConnection;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

const joinBtn = document.getElementById('joinBtn');
const roomInput = document.getElementById('roomId');
const studentVideo = document.getElementById('studentVideo');
const counselorVideo = document.getElementById('counselorVideo');
const transcriptDiv = document.getElementById('transcript');

joinBtn.onclick = async () => {
    const roomId = roomInput.value.trim();
    if (!roomId) return alert("Enter Room ID");

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    counselorVideo.srcObject = localStream;

    socket.emit('join-room', roomId);

    peerConnection = new RTCPeerConnection(config);
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
        studentVideo.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) socket.emit('signal', { to: 'student', signal: event.candidate });
    };

    // Listen for signals from student
    socket.on('signal', async (data) => {
        if (data.signal.type === 'answer') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
        } else if (data.signal.candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
        }
    });

    // Create offer and send to student
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('signal', { to: 'student', signal: offer });

    // Receive transcript
    socket.on('receive-transcript', transcript => {
        transcriptDiv.innerText = transcript;
    });
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