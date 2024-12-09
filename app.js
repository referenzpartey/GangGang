let map;
let chatEnabled = false;
const users = { partey: "abxy1289" };
const onlineUsers = {};

// Helper functions for weather information
function fetchWeatherInfo() {
    return fetch('https://api.open-meteo.com/v1/forecast?latitude=51.505&longitude=-0.09&current_weather=true&daily=temperature_2m_min,temperature_2m_max&timezone=auto')
        .then(response => response.json())
        .then(data => {
            const currentTemp = data.current_weather.temperature;
            const tomorrowTemp = data.daily.temperature_2m_max[1];
            return { currentTemp, tomorrowTemp };
        });
}

function updateWeatherInfo() {
    fetchWeatherInfo().then(({ currentTemp, tomorrowTemp }) => {
        const weatherText = `Current: ${currentTemp}°C, Tomorrow: ${tomorrowTemp}°C`;
        let weatherIcon = "";

        if (currentTemp < 5) {
            weatherIcon = "snowman.png";
        } else if (currentTemp >= 5 && currentTemp < 18) {
            weatherIcon = "pullover.png";
        } else if (currentTemp >= 18 && currentTemp <= 25) {
            weatherIcon = "tshirt.png";
        } else {
            weatherIcon = "fire.png";
        }

        document.getElementById('weatherText').textContent = weatherText;
        document.getElementById('weatherIcon').src = weatherIcon;
    });
}

// Authentication and registration
function authenticate(username, password) {
    return users[username] === password;
}

function registerUser(username, password) {
    if (username.length > 10 || password.length > 20) {
        alert("Username or password is too long.");
        return;
    }
    if (users[username]) {
        alert("Username already exists.");
        return;
    }
    users[username] = password;
    alert(`User ${username} registered successfully.`);
}

// Map and chat initialization
function initMap() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('map').style.display = 'block';

    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                L.marker(userLocation).addTo(map).bindPopup("Your Location").openPopup();
                map.setView(userLocation, 13);
                onlineUsers['you'] = userLocation;
            },
            () => {
                alert('Geolocation permission denied or unavailable.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function showInfoScreen() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('infoScreen').style.display = 'flex';
    updateWeatherInfo();
}

function backToMap() {
    document.getElementById('infoScreen').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}

function addToHomeScreen() {
    alert('To add this app to your home screen, open the browser menu and select "Add to Home Screen".');
}

// Chat functionality
function startChat(username) {
    if (!onlineUsers[username]) {
        alert(`User ${username} is not online.`);
        return;
    }
    chatEnabled = true;
    document.getElementById('chat').style.display = 'block';
    document.getElementById('chatWindow').innerHTML = `<p>Chat with ${username}</p>`;
}

function sendMessage() {
    if (!chatEnabled) return;

    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message.length > 0) {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        input.value = '';
    }
}

function endChat() {
    chatEnabled = false;
    document.getElementById('chat').style.display = 'none';
}

// Event listeners
document.getElementById('login').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticate(username, password)) {
        initMap();
    } else {
        alert('Invalid username or password.');
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
    registerUser(newUsername, newPassword);
    document.getElementById('register').style.display = 'none';
    document.getElementById('auth').style.display = 'flex';
});

document.getElementById('backToMap').addEventListener('click', backToMap);
document.getElementById('addToHome').addEventListener('click', addToHomeScreen);
document.getElementById('sendChat').addEventListener('click', sendMessage);
document.getElementById('endChat').addEventListener('click', endChat);
