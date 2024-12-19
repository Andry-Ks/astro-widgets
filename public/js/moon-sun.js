"use strict";

// weatherapi фази місяця та сонце
const moonPhases = {
    "New Moon": "🌑",
    "Waxing Crescent": "🌒",
    "First Quarter": "🌓",
    "Waxing Gibbous": "🌔",
    "Full Moon": "🌕",
    "Waning Gibbous": "🌖",
    "Last Quarter": "🌗",
    "Waning Crescent": "🌘",
  };
  
  async function fetchMoonData(city = '') {
    try {
      const response = await fetch(`/api/moon?city=${city}`);
      const data = await response.json();
  
      document.getElementById('moon-phase').textContent = `Phase: ${data.astronomy.moon_phase}`;
      document.getElementById('moon-icon').textContent = moonPhases[data.astronomy.moon_phase] || "❓";
      document.getElementById('moon-icon').style.display = 'block';
      document.getElementById('moonrise').textContent = `Moon rise: ${data.astronomy.moonrise}`;
      document.getElementById('moonset').textContent = `Moon set: ${data.astronomy.moonset}`;
      document.getElementById('sunrise').textContent = `Sun rise: ${data.astronomy.sunrise}`;
      document.getElementById('sunset').textContent = `Sun set: ${data.astronomy.sunset}`;
  
      document.querySelectorAll('[data-city="true"]').forEach(element => {
        element.textContent = `Current location: ${data.location}`;
      });
  
      document.getElementById('moon-illumination').textContent = `Moon illumination: ${data.astronomy.moon_illumination}%`;
    } catch (error) {
      document.getElementById('moon-phase').textContent = 'Data loading error.';
      console.error('Error:', error);
    }
  }
  // Обробник натискання кнопки
  document.getElementById('city-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value.trim();
    fetchMoonData(cityInput || '');
  });
  fetchMoonData();