const socket = io();

let peer;
let localStream;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');

// Get user media
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;

        // Initialize peer connection
        peer = new SimplePeer({
            initiator: location.hash === '#init',
            trickle: false,
            stream: stream,
        });

        // Event listeners for peer connection
        peer.on('signal', data => {
            socket.emit('signal', JSON.stringify(data));
        });

        peer.on('stream', remoteStream => {
            remoteVideo.srcObject = remoteStream;
        });

        peer.on('data', handleMessage);

        // Send initial signal
        socket.emit('join', window.location.pathname);
    })
    .catch(error => console.error('Error accessing media devices:', error));

// Event listener for sending messages
function sendMessage() {
    const message = messageInput.value;
    peer.send(message);

    // Display own message in the chat box
    displayMessage('You: ' + message);

    // Clear input field
    messageInput.value = '';
}

// Event listener for receiving messages
function handleMessage(data) {
    const message = data.toString('utf-8');
    displayMessage('Peer: ' + message);
}

// Display messages in the chat box
function displayMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    chatBox.appendChild(div);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}
