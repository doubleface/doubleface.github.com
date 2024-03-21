// Créer la carte
var map = L.map('map').fitWorld();
let marker = null
let accuracyCircle = null

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Fonction pour afficher la position
function showPosition(position) {
  console.log('showPosition called', position)
  const lat = position.coords.latitude
  const lng = position.coords.longitude
  const accuracy = position.coords.accuracy
  if (marker) {
    map.removeLayer(marker)
  }
  if (accuracyCircle) {
    map.removeLayer(accuracyCircle)
  }
  marker = L.marker([lat, lng]).addTo(map)
  accuracyCircle = L.circle([lat, lng], accuracy, {
    color: '#0000ff',
    fillColor: '#0000ff',
    fillOpacity: 0.3
  }).addTo(map)
  // Centrer la carte sur le nouveau marqueur
  map.panTo([lat, lng]);
}

// Obtenir la position en temps réel
navigator.geolocation.watchPosition(showPosition);
