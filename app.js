
// JavaScript Code for Real-Time Location App with All Requested Features

// Global Variables
let map;
let chatEnabled = false;
const users = { partey: "abxy1289" };
let pendingRegistrations = [];
const onlineUsers = {};

// User Authentication
function authenticate(username, password) {
    return users[username] === password;
}

// Registration Request
function requestRegistration(username, password) {
    if (username.length > 10 || password.length > 20) {
        alert("Username or password is too long.");
        return;
    }
    pendingRegistrations.push({ username, password });
    alert("Registration request sent.");
    notifyPeers("registration", { username, password });
}

// Approve or Deny Registration
function handleRegistrationRequest(request) {
    const { username } = request;
    const userAction = confirm(`New registration: ${username}\n\nApprove or Deny?`);
    if (userAction) {
        users[username] = request.password;
        alert(`${username} added.`);
        updateUserFile();
    } else {
        alert(`${username} denied.`);
    }
}

// Update User File
function updateUserFile() {
    notifyPeers("updateUsers", users);
}

// Initialize Map
function initMap() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('map-container').style.display = 'block';

    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    startLocationUpdates();
}

// Start Location Updates
function startLocationUpdates() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            notifyPeers("locationUpdate", { username: "currentUser", lat: latitude, lng: longitude });
        });
    } else {
        alert("Geolocation not supported.");
    }
}

// Handle Peer Messages
function handlePeerMessage(type, data) {
    if (type === "registration") {
        handleRegistrationRequest(data);
    } else if (type === "locationUpdate") {
        updatePeerLocation(data);
    }
}

// Update Peer Location on Map
function updatePeerLocation({ username, lat, lng }) {
    if (!onlineUsers[username]) {
        onlineUsers[username] = L.marker([lat, lng]).addTo(map).bindPopup(username);
    } else {
        onlineUsers[username].setLatLng([lat, lng]);
    }
}

// Communication with Peers (WebRTC Placeholder)
function notifyPeers(type, data) {
    console.log(`Notify peers: ${type}`, data);
}
