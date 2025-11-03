

const socket = io();
let localStream, peerConnection, recognition;
let currentRoomId = null;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

const joinBtn = document.getElementById('joinBtn');
const roomInput = document.getElementById('roomId');
const studentVideo = document.getElementById('studentVideo');
const counselorVideo = document.getElementById('counselorVideo');
const transcriptDiv = document.getElementById('transcript');

// Listen for signals from counselor (set up once)
socket.on('signal', async (data) => {
    if (!peerConnection) return;
    
    try {
        if (data.signal.type === 'offer') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.emit('signal', { room: currentRoomId, signal: answer });
        } else if (data.signal.candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
        }
    } catch (error) {
        console.error('Error handling signal:', error);
    }
});

joinBtn.onclick = async () => {
    const roomId = roomInput.value.trim();
    if (!roomId) return alert("Enter Room ID");

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        studentVideo.srcObject = localStream;
        currentRoomId = roomId;

        socket.emit('join-room', roomId);

        peerConnection = new RTCPeerConnection(config);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.ontrack = (event) => {
            counselorVideo.srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('signal', { room: roomId, signal: event.candidate });
            }
        };

        // Speech recognition
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.onresult = (event) => {
                const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
                transcriptDiv.innerText = transcript;
                socket.emit('transcript', { room: roomId, transcript });
            };
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };
            recognition.start();
        } else {
            console.warn('Speech recognition not supported in this browser');
        }
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
document.getElementById('endBtn').onclick = () => location.reload();
