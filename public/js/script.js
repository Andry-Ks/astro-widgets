"use strict";

const numStars = 100; //Кількість зірок
const starsContainer = document.getElementById('stars');
//Створення зірок
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    //Вертикальна позиція зірки-випадкове значення від 0% до 100% висоти екрану
    star.style.top = `${Math.random() * 100}vh`; 
    star.style.left = `${Math.random() * 100}vw`;
    //star.style.animationDelay = `${Math.random() * 5}s`; //Випадкова затримка перед початком анімації
    starsContainer.appendChild(star); //Додаємо зірки в контейнер .stars
}

// Фази місяця
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
    document.getElementById('city').textContent = `Current location: ${data.location}`;
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