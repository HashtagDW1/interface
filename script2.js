window.addEventListener('DOMContentLoaded')

const pulseDisplay = document.getElementById('pulse');
const volumeControl = document.getElementById('volume');

const sounds = {
  nature: new Audio('Audio/wind.mp3'),
  birds: new Audio('Audio/birds.mp3'),
  water: new Audio('Audio/water.mp3'),
  hiphop: new Audio('Audio/hiphop.mp3'),
  drums: new Audio('Audio/drums.mp3'),
  guitar: new Audio('Audio/guitar.mp3'),
  
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
let lastBeatTime = 0;

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

      

      if (pulse) {
        /*pulseDisplay.textContent = pulse;
        updateBackground(pulse);*/
      
        beatInterval = 60000 / pulse;
      
        const now = Date.now();
        if (now - lastBeatTime >= beatInterval) {
          triggerLightDots();
          lastBeatTime = now;
        }}


  
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
/*function updateBackground(pulse) {
  if (pulse <= 45) {
    document.body.style.background = 'radial-gradient(circle at center, #0a0f1c, #1c2541, #3a506b)';
    document.body.style.filter = 'brightness(0.7) saturate(1.2)';
  } else if (pulse <= 55) {
    document.body.style.background = 'radial-gradient(circle at center, #102027, #37474f, #62727b)';
    document.body.style.filter = 'brightness(0.8) saturate(1.3)';
  } else if (pulse <= 65) {
    document.body.style.background = 'radial-gradient(circle at center, #1b3b2a, #285943, #3a6351)';
    document.body.style.filter = 'brightness(0.9) saturate(1.2)';
  } else if (pulse <= 75) {
    document.body.style.background = 'radial-gradient(circle at center, #2f3e46, #354f52, #52796f)';
    document.body.style.filter = 'brightness(1) saturate(1)';
  } else if (pulse <= 85) {
    document.body.style.background = 'radial-gradient(circle at center, #cad2c5, #84a98c, #52796f)';
    document.body.style.filter = 'brightness(1.1) saturate(1)';
  } else if (pulse <= 95) {
    document.body.style.background = 'radial-gradient(circle at center, #ffeaa7, #fab1a0, #ffb4a2)';
    document.body.style.filter = 'brightness(1.2) saturate(1.1)';
  } else if (pulse <= 105) {
    document.body.style.background = 'radial-gradient(circle at center, #f7d9c4, #f7a072, #ff8c42)';
    document.body.style.filter = 'brightness(1.3) saturate(1.2)';
  } else if (pulse <= 120) {
    document.body.style.background = 'radial-gradient(circle at center, #ffb5a7, #fcd5ce, #f8edeb)';
    document.body.style.filter = 'brightness(1.3) saturate(1.3)';
  } else if (pulse <= 140) {
    document.body.style.background = 'radial-gradient(circle at center, #ff6b6b, #ff5252, #ff3c3c)';
    document.body.style.filter = 'brightness(1.4) saturate(1.5)';
  } else {
    document.body.style.background = 'radial-gradient(circle at center, #c9184a, #ff4d6d, #ff758f)';
    document.body.style.filter = 'brightness(1.5) saturate(1.7)';
  }
}*/


const lightContainer = document.querySelector('.light-container');

function triggerLightDots() {
  const numDots = Math.floor(Math.random() * 20) + 10; // 10 bis 30 Punkte pro Puls

  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('light-dot');

    // Zufällige Position
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;

    // Zufällige Farbe (leicht variieren)
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 30;
    const lightness = 60 + Math.random() * 20;
    dot.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    dot.style.boxShadow = `0 0 6px hsl(${hue}, ${saturation}%, ${lightness}%)`;

    lightContainer.appendChild(dot);

    // Start Animation
    setTimeout(() => {
      dot.style.opacity = 1;
      dot.style.transform = 'scale(1.5)';
    }, 10);

    

    // Entfernen
    setTimeout(() => {
      dot.remove();
    }, 600);
  }
}

