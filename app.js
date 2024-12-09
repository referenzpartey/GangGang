
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

// Sample users for the initial setup
let users = { admin: "admin" };
let pendingRegistrations = [];

document.getElementById('login').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (authenticate(username, password)) {
        if (username === "admin") {
            alert("Admin account is temporary. Please create a user account.");
        }
        document.getElementById('auth').style.display = 'none';
        document.getElementById('map').style.display = 'block';
        initMap();
    } else {
        alert('Invalid credentials.');
    }
});

document.getElementById('registerButton').addEventListener('click', () => {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
});

document.getElementById('cancelRegistration').addEventListener('click', () => {
    document.getElementById('register').style.display = 'none';
    document.getElementById('auth').style.display = 'flex';
});

document.getElementById('submitRegistration').addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    if (newUsername.length > 10 || newPassword.length > 20) {
        alert("Username or password is too long.");
        return;
    }
    if (users["admin"]) {
        delete users["admin"];
        alert("Admin account deleted after first user registration.");
    }
    users[newUsername] = newPassword;
    alert(`User ${newUsername} registered successfully.`);
    document.getElementById('register').style.display = 'none';
    document.getElementById('auth').style.display = 'flex';
});

function authenticate(username, password) {
    return users[username] === password;
}

function initMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
}
