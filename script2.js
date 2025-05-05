const pulseSlider = document.getElementById('pulseSlider');
const pulseInput = document.getElementById('pulseInput');
const confirmBtn = document.getElementById('confirmBtn');
const worldContainer = document.getElementById('worldContainer');

// Synchronisiere Slider und Input, aber spiele noch nichts ab
pulseSlider.addEventListener('input', () => {
  pulseInput.value = pulseSlider.value;
});

pulseInput.addEventListener('input', () => {
  const value = Math.max(60, Math.min(180, pulseInput.value));
  pulseSlider.value = value;
});

// Beim Klick auf "Bestätigen" starte die Welt
confirmBtn.addEventListener('click', () => {
  const pulse = parseInt(pulseInput.value);
  updateWorld(pulse);
});

function updateWorld(pulse) {
  const stage = Math.floor(pulse / 10) * 10;
  let title = '', video = '';

  switch (stage) {
    case 60:
      title = "Entspannung pur 🍃";
      video = "video/Puls 60.mp4";
      break;
    case 70:
      title = "Neutral & ausgeglichen 🌇";
      video = "video/Puls 70.mp4";
      break;
    case 80:
      title = "Leichte Spannung 💡";
      video = "video/Puls 80.mp4";
      break;
    case 90:
      title = "Adrenalin steigt 🚀";
      video = "video/Puls 90.mp4";
      break;
    case 100:
      title = "Volle Aktivierung 🔥";
      video = "video/Puls 100.mp4";
      break;
    default:
      title = "Noch kein Video für diesen Bereich 🎬";
      video = "";
  }

  if (!video) return;

  // UI verstecken
  document.querySelector('header').classList.add('hidden');
  document.querySelector('.pulse-section').classList.add('hidden');

  // Video einfügen
  worldContainer.innerHTML = `
    <div class="fullscreen-video">
      <video id="pulseVideo" autoplay muted playsinline>
        <source src="${video}" type="video/mp4">
        Dein Browser unterstützt dieses Videoformat nicht.
      </video>
    </div>
  `;

  const videoElement = document.getElementById('pulseVideo');

  videoElement.addEventListener('canplay', () => {
    videoElement.play().catch(err => {
      console.error("Autoplay wurde blockiert:", err);
    });
  });

  videoElement.addEventListener('ended', () => {
    document.querySelector('header').classList.remove('hidden');
    document.querySelector('.pulse-section').classList.remove('hidden');
    worldContainer.innerHTML = '';
  });
}


document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const videoOverlay = document.querySelector('.fullscreen-video');
    if (videoOverlay) {
      // Video pausieren
      const videoElement = videoOverlay.querySelector('video');
      if (videoElement) {
        videoElement.pause();
      }

      // UI zurückbringen
      document.querySelector('header').classList.remove('hidden');
      document.querySelector('.pulse-section').classList.remove('hidden');

      // Video-Overlay entfernen
      videoOverlay.remove();
    }
  }
});
