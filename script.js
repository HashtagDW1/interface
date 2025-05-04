
  window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("startOverlay");
    const hero = document.getElementById("hero");
    const audio = document.getElementById("pulseSound");
    const video = document.getElementById("backgroundVideo");

    overlay.addEventListener("click", () => {
      // Audio starten
      audio.play().catch(err => console.warn("Audio blockiert:", err));

      // Video starten
      video.play().catch(err => console.warn("Video blockiert:", err));

      // Overlay ausblenden
      overlay.style.display = "none";

      setTimeout(() => {
        video.pause(); // Pausiert das Video
        video.classList.add("fade-out"); // Fügt die Fade-Out Klasse hinzu

        // Nach dem Fade-Out (2 Sekunden), Video entfernen und Hero anzeigen
        setTimeout(() => {
         
          hero.style.display = "flex";
        }, 1000); // Warte 2 Sekunden für das Fade-Out
      }, 4000); // Warte 4 Sekunden
      });
    });

  
