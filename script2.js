const pulseDisplay = document.getElementById('pulse');
const volumeControl = document.getElementById('volume');

const sounds = {
  nature: new Audio('audio/wind.mp3'),
  birds: new Audio('audio/birds.mp3'),
  water: new Audio('audio/water.mp3')
};

// Loop + initial volume
for (const sound of Object.values(sounds)) {
  sound.loop = true;
  sound.volume = volumeControl.value;
}

// Volume-Event
volumeControl.addEventListener('input', (e) => {
  const vol = e.target.value;
  for (const sound of Object.values(sounds)) {
    sound.volume = vol;
  }
});

// Sound-Karten-Toggle
document.querySelectorAll('.sound-card').forEach(card => {
  card.addEventListener('click', () => {
    const soundKey = card.dataset.sound;
    const sound = sounds[soundKey];

    if (card.classList.contains('active')) {
      card.classList.remove('active');
      sound.pause();
    } else {
      card.classList.add('active');
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  });
});

// Progress-Circle vorbereiten
const circle = document.querySelector('.progress-ring .progress');
const radius = 54;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`; // Start: vollständig leer

function updateCircle(durationMs, requiredMs = 20000) {
  const progress = Math.min(durationMs / requiredMs, 1);
  const offset = circumference * (1 - progress);
  circle.style.strokeDashoffset = offset;
}

// Pulsoid WebSocket + Schwellen-Logik
const ACCESS_TOKEN = '9016a765-2c89-4591-b595-3186be28e3a3';
const socket = new WebSocket(`wss://dev.pulsoid.net/api/v1/data/real_time?access_token=${ACCESS_TOKEN}`);

let initialPulse = null;
let belowThresholdSince = null;
const REQUIRED_DURATION = 20000; // 20 Sekunden

socket.addEventListener('message', (event) => {
  try {
    const json = JSON.parse(event.data);
    const pulse = json?.data?.heart_rate;

    if (pulse) {
      pulseDisplay.textContent = pulse;

      if (initialPulse === null) {
        initialPulse = pulse;
        console.log(`📌 Initialpuls: ${initialPulse}`);
      }

      const threshold = initialPulse * 0.9;

      if (pulse <= threshold) {
        if (belowThresholdSince === null) {
          belowThresholdSince = Date.now();
          console.log(`⏳ Puls unter Schwelle. Timer gestartet.`);
        } else {
          const duration = Date.now() - belowThresholdSince;
          updateCircle(duration);
          if (duration >= REQUIRED_DURATION) {
            console.warn(`🛑 Puls unter Schwelle seit ${duration / 1000}s – Weiterleitung.`);
            window.location.href = 'finish.html';
          }
        }
      } else {
        if (belowThresholdSince !== null) {
          console.log(`✅ Puls wieder über Schwelle. Timer zurückgesetzt.`);
        }
        belowThresholdSince = null;
        updateCircle(0);
      }
    }
  } catch (e) {
    console.error('Fehler beim Verarbeiten der Pulsoid-Daten:', e);
  }
});
