
let map;
const users = { partey: "abxy1289" };

function authenticate(username, password) {
    return users[username] === password;
}

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
            },
            () => {
                alert('Geolocation permission denied or unavailable.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

const loginButton = document.getElementById('login');
loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticate(username, password)) {
        initMap();
    } else {
        alert('Invalid username or password.');
    }
});
