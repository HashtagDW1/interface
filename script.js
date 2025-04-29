document.getElementById('startButton').addEventListener('click', function() {
    window.location.href = 'seite2.html'; // Hier kannst du den Pfad zur nächsten Seite anpassen
});



  const video = document.getElementById("backgroundVideo");
  const startButton = document.getElementById("startButton");

  video.addEventListener("ended", () => {
    startButton.classList.add("visible", "pulsing");
  });

