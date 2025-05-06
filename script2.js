const worldContainer = document.getElementById('worldContainer');

// Klick auf eine Weltkarte → Video abspielen
document.querySelectorAll('.world-card').forEach(card => {
  card.addEventListener('click', () => {
    const video = card.getAttribute('data-video');
    const title = card.getAttribute('data-title');

    document.querySelector('.pulse-section').classList.add('hidden');

    worldContainer.innerHTML = `
      <div class="fullscreen-video">
        <video id="pulseVideo" autoplay muted playsinline>
          <source src="${video}" type="video/mp4">
          Dein Browser unterstützt dieses Videoformat nicht.
        </video>
        <div class="world-title">${title}</div>
      </div>
    `;

    const videoElement = document.getElementById('pulseVideo');

    videoElement.addEventListener('canplay', () => {
      videoElement.play().catch(err => {
        console.error("Autoplay wurde blockiert:", err);
      });
    });

    videoElement.addEventListener('ended', () => {
      document.querySelector('.pulse-section').classList.remove('hidden');
      worldContainer.innerHTML = '';
    });
  });
});

// ESC-Taste → Video schließen
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const videoOverlay = document.querySelector('.fullscreen-video');
    if (videoOverlay) {
      const videoElement = videoOverlay.querySelector('video');
      if (videoElement) videoElement.pause();

      document.querySelector('.pulse-section').classList.remove('hidden');
      videoOverlay.remove();
    }
  }
});
