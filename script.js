document.getElementById('startButton').addEventListener('click', function() {
    window.location.href = 'seite2.html'; // Hier kannst du den Pfad zur nächsten Seite anpassen
});



const video = document.getElementById("backgroundVideo");

video.addEventListener("timeupdate", () => {
  if (video.currentTime >= 4) {
    video.pause();
    video.style.opacity = "0";
    
    // Optional: Video zurücksetzen oder ausblenden
    // video.currentTime = 0;
  }
});

  const startButton = document.getElementById("startButton");

  video.addEventListener("pause", () => {
    startButton.classList.add("visible", "pulsing");
    einblenden.classList.add("visible")
  });

