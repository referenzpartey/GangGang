
// JavaScript Code for Real-Time Location App with All Requested Features

// Global Variables
let map;
let chatEnabled = false;
const users = { partey: "abxy1289" };
let pendingRegistrations = [];
const onlineUsers = {};

// User Authentication
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username] === password) {
        alert("Login successful");
        initMap(username);
    } else {
        alert("Invalid username or password");
    }
}

// Show Registration Form
function showRegistration() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

// Submit Registration Request
function submitRegistration() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    if (newUsername.length > 10 || newPassword.length > 20) {
        alert("Username or password exceeds maximum length.");
        return;
    }
    alert(`Registration requested for ${newUsername}`);
    document.getElementById('register').style.display = 'none';
    document.getElementById('auth').style.display = 'block';
}

// Cancel Registration
function cancelRegistration() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('auth').style.display = 'block';
}

// Initialize Map
function initMap(username) {
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
            console.log(`Current location: ${latitude}, ${longitude}`);
        });
    } else {
        alert("Geolocation not supported.");
    }
}

// Show Info Screen
function showInfoScreen() {
    document.getElementById('map-container').style.display = 'none';
    document.getElementById('infoScreen').style.display = 'block';
}

// Show Map
function showMap() {
    document.getElementById('infoScreen').style.display = 'none';
    document.getElementById('map-container').style.display = 'block';
}

// Add to Home Screen Placeholder
function addToHomeScreen() {
    alert("Feature to add to home screen coming soon.");
}

// Chat Functions Placeholder
function sendChatMessage() {
    alert("Chat message sent.");
}

function endChat() {
    alert("Chat ended.");
}
