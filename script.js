const video = document.getElementById("backgroundVideo");
const hero = document.getElementById("hero");


// 1. Sobald das Video zu Ende ist, Inhalte zeigen
video.addEventListener("ended", () => {
  // Video ausblenden
  video.style.opacity = "0";

  // Inhalte einblenden
  hero.style.visibility = "visible";
  hero.style.opacity = "1";
 
});
