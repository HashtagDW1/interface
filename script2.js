const worldContainer = document.getElementById('worldContainer');

// Klick auf eine Weltkarte → Video + Audio abspielen
document.querySelectorAll('.world-card').forEach(card => {
  card.addEventListener('click', () => {
    const videoSrc = card.getAttribute('data-video');
    const audioSrc = card.getAttribute('data-audio');
    const title = card.getAttribute('data-title');

    // UI verstecken
    document.querySelector('.pulse-section').classList.add('hidden');

    // Video + Audio + Titel einfügen
    worldContainer.innerHTML = `
      <div class="fullscreen-video fade-in">
        <video id="pulseVideo" autoplay muted playsinline>
          <source src="${videoSrc}" type="video/mp4">
          Dein Browser unterstützt dieses Videoformat nicht.
        </video>
        <audio id="pulseAudio" preload="auto">
          <source src="${audioSrc}" type="audio/mpeg">
          Dein Browser unterstützt dieses Audioformat nicht.
        </audio>
        <div class="world-title">${title}</div>
      </div>
    `;

    const videoElement = document.getElementById('pulseVideo');
    const audioElement = document.getElementById('pulseAudio');

    videoElement.addEventListener('canplay', () => {
      videoElement.play().catch(err => console.error("Video konnte nicht starten:", err));
      audioElement.play().catch(err => console.error("Audio konnte nicht starten:", err));
    });

    videoElement.addEventListener('ended', () => {
      stopMedia();
    });
  });
});

// ESC-Taste → Alles schließen
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    stopMedia();
  }
});

// Gemeinsames Stoppen von Video + Audio
function stopMedia() {
  const overlay = document.querySelector('.fullscreen-video');
  if (overlay) {
    const video = overlay.querySelector('video');
    const audio = overlay.querySelector('audio');

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    // nach dem Ausblenden entfernen
    setTimeout(() => {
      overlay.remove();
      document.querySelector('.pulse-section').classList.remove('hidden');
    }, 500); // Dauer des Fade-Outs
  }
}
