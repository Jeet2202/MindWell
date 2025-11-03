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

// Listen for when student joins the room
socket.on('user-connected', async (userId) => {
    console.log('Student connected:', userId);
    // Student joined, now create and send offer
    if (peerConnection && currentRoomId) {
        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socket.emit('signal', { room: currentRoomId, signal: offer });
            console.log('Offer sent to student');
        } catch (error) {
            console.error('Error creating offer:', error);
        }
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
        counselorVideo.srcObject = localStream;
        currentRoomId = roomId;

        peerConnection = new RTCPeerConnection(config);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.ontrack = (event) => {
            console.log('Received remote stream from student');
            studentVideo.srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('signal', { room: roomId, signal: event.candidate });
            }
        };

        peerConnection.onconnectionstatechange = () => {
            console.log('Connection state:', peerConnection.connectionState);
        };

        // Join room first, will create offer when student joins
        socket.emit('join-room', roomId);
        console.log('Counselor joined room:', roomId);
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
                    counselorVideo.srcObject = localStream;
                    currentRoomId = roomId;
                    
                    peerConnection = new RTCPeerConnection(config);
                    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
                    
                    peerConnection.ontrack = (event) => {
                        console.log('Received remote stream from student');
                        studentVideo.srcObject = event.streams[0];
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
                    console.log('Counselor joined room with audio only:', roomId);
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
                counselorVideo.srcObject = localStream;
                currentRoomId = roomId;
                
                peerConnection = new RTCPeerConnection(config);
                localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
                
                peerConnection.ontrack = (event) => {
                    console.log('Received remote stream from student');
                    studentVideo.srcObject = event.streams[0];
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
                console.log('Counselor joined room:', roomId);
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