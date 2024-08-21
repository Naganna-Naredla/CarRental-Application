document.addEventListener('DOMContentLoaded', function() {
  const map = L.map('map').setView([20.5937, 78.9629], 6); // Initial view set to India

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Define custom circle markers
  const carGreenCircle = {
      radius: 12, // Radius of the circle
      color: 'green', // Color of the circle
      fillColor: 'green', // Fill color of the circle
      fillOpacity: 0.6 // Fill opacity of the circle
  };

  const carRedCircle = {
      radius: 12, // Radius of the circle
      color: 'red', // Color of the circle
      fillColor: 'red', // Fill color of the circle
      fillOpacity: 0.6 // Fill opacity of the circle
  };

  // Fetch car data from the server
  async function fetchCarData() {
      try {
          const response = await fetch('/api/cars/locations');
          const cars = await response.json();

          if (cars.length === 0) {
              console.warn('No car data found.');
          }

          // Add markers to the map
          cars.forEach(car => {
              let circleOptions = car.status === 'In Trip' ? carGreenCircle : carRedCircle;
              let { lat, lon } = getCoordinates(car.description); // Replace with actual geocoding

              if (lat !== 0 && lon !== 0) {
                  L.circle([lat, lon], circleOptions)
                    .addTo(map)
                    .bindPopup(`<b>${car.make} ${car.model}</b><br>Status: ${car.status}`);
              } else {
                  console.warn(`Coordinates not found for description: ${car.description}`);
              }
          });
      } catch (error) {
          console.error('Error fetching car data:', error);
      }
  }

  // Replace this with actual geocoding if needed
  function getCoordinates(description) {
      const coordinates = {
          'Nellore': { lat: 14.4334, lon: 79.9773 },
          'Tirupati': { lat: 13.6288, lon: 79.4192 },
          'Chennai': { lat: 13.0827, lon: 80.2707 }
      };
      return coordinates[description] || { lat: 0, lon: 0 };
  }

  fetchCarData();
});
