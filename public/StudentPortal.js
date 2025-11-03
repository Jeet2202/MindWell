

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
            console.log('Received offer from counselor');
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.emit('signal', { room: currentRoomId, signal: answer });
            console.log('Answer sent to counselor');
        } else if (data.signal.candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
        }
    } catch (error) {
        console.error('Error handling signal:', error);
    }
});

// Handle case where counselor is already in the room
socket.on('room-users', (existingUsers) => {
    console.log('Existing users in room:', existingUsers);
    if (existingUsers.length > 0) {
        console.log('Counselor is already in the room, waiting for offer...');
    }
});

joinBtn.onclick = async () => {
    const roomId = roomInput.value.trim();
    if (!roomId) return alert("Enter Room ID");

    try {
        // Check if media devices are available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Your browser does not support camera/microphone access');
        }

        // Try to get user media with better error handling
        console.log('Requesting camera and microphone access...');
        localStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }, 
            audio: true 
        });
        console.log('Camera and microphone access granted');
        studentVideo.srcObject = localStream;
        currentRoomId = roomId;

        peerConnection = new RTCPeerConnection(config);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.ontrack = (event) => {
            console.log('Received remote stream from counselor');
            counselorVideo.srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('signal', { room: roomId, signal: event.candidate });
            }
        };

        peerConnection.onconnectionstatechange = () => {
            console.log('Connection state:', peerConnection.connectionState);
        };

        // Join room - server will notify counselor
        socket.emit('join-room', roomId);
        console.log('Student joined room:', roomId);

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
        let errorMessage = 'Failed to access camera/microphone.\n\n';
        
        if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            errorMessage += 'No camera or microphone found. Please connect a device.';
        } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            errorMessage += 'Permission denied. Please allow camera and microphone access in your browser settings.';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
            errorMessage += 'Camera is already in use by another application.\n\nWould you like to join with AUDIO ONLY?';
            if (confirm(errorMessage)) {
                // Try audio-only mode
                try {
                    localStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
                    studentVideo.srcObject = localStream;
                    currentRoomId = roomId;
                    
                    peerConnection = new RTCPeerConnection(config);
                    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
                    
                    peerConnection.ontrack = (event) => {
                        console.log('Received remote stream from counselor');
                        counselorVideo.srcObject = event.streams[0];
                    };
                    
                    peerConnection.onicecandidate = (event) => {
                        if (event.candidate) {
                            socket.emit('signal', { room: roomId, signal: event.candidate });
                        }
                    };
                    
                    peerConnection.onconnectionstatechange = () => {
                        console.log('Connection state:', peerConnection.connectionState);
                    };
                    
                    socket.emit('join-room', roomId);
                    console.log('Student joined room with audio only:', roomId);
                    
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
                    }
                    
                    alert('Joined with audio only. Your camera is disabled.');
                    return;
                } catch (audioError) {
                    alert('Failed to join with audio only: ' + audioError.message);
                }
            }
            return;
        } else if (error.name === 'OverconstrainedError') {
            errorMessage += 'Camera does not meet requirements. Trying again with lower settings...';
            // Try again with lower constraints
            try {
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                studentVideo.srcObject = localStream;
                currentRoomId = roomId;
                
                peerConnection = new RTCPeerConnection(config);
                localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
                
                peerConnection.ontrack = (event) => {
                    console.log('Received remote stream from counselor');
                    counselorVideo.srcObject = event.streams[0];
                };
                
                peerConnection.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('signal', { room: roomId, signal: event.candidate });
                    }
                };
                
                peerConnection.onconnectionstatechange = () => {
                    console.log('Connection state:', peerConnection.connectionState);
                };
                
                socket.emit('join-room', roomId);
                console.log('Student joined room:', roomId);
                return; // Success on retry
            } catch (retryError) {
                errorMessage = 'Failed to access camera/microphone: ' + retryError.message;
            }
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage);
    }
};

document.getElementById('toggleVideo').onclick = () => {
    if(localStream) localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
};
document.getElementById('toggleAudio').onclick = () => {
    if(localStream) localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
};
document.getElementById('endBtn').onclick = () => location.reload();
