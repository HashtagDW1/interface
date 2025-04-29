const pulseSlider = document.getElementById('pulseSlider');
const pulseInput = document.getElementById('pulseInput');
const worldContainer = document.getElementById('worldContainer');

pulseSlider.addEventListener('input', () => {
  pulseInput.value = pulseSlider.value;
  updateWorld(parseInt(pulseSlider.value));
});

pulseInput.addEventListener('input', () => {
  const value = Math.max(50, Math.min(180, pulseInput.value));
  pulseSlider.value = value;
  updateWorld(parseInt(value));
});

function updateWorld(pulse) {
  const stage = Math.floor(pulse / 10) * 10;
  let title = '', video = '', sound = '', bg = '';

  switch (stage) {
    case 50:
      title = "Tiefe Ruhe 🌙";
      video = "video/Puls 50.mp4";
      sound = "audio/calm_50.mp3";
      break;
    case 60:
      title = "Entspannung pur 🍃";
      video = "video/Puls 60.mp4";
      sound = "audio/calm_60.mp3";
      bg = "#aed581";
      break;
    case 70:
      title = "Neutral & ausgeglichen 🌇";
      video = "video/Puls 70.mp4";
      sound = "audio/neutral_70.mp3";
      bg = "#fff176";
      break;
    case 80:
      title = "Leichte Spannung 💡";
      video = "video/Puls 80.mp4";
      sound = "audio/tense_80.mp3";
      bg = "#ffd54f";
      break;
    case 90:
      title = "Adrenalin steigt 🚀";
      video = "video/Puls 90.mp4";
      sound = "audio/hot_90.mp3";
      bg = "#ffb74d";
      break;
    case 100:
      title = "Volle Aktivierung 🔥";
      video = "video/Puls 100.mp4";
      sound = "audio/fast_100.mp3";
      bg = "#ff7043";
      break;
    case 110:
    case 120:
    case 130:
      title = "Stress-Level! ⚡";
      video = "video/Puls 110.mp4";  // Falls du für jeden Pulswert ein eigenes Video hast
      sound = "audio/stress.mp3";
      bg = "#ef5350";
      break;
    case 140:
    case 150:
    case 160:
      title = "Überreizt! 💥";
      video = "video/Puls 140.mp4";  // Hier ebenfalls das passende Video für den Bereich
      sound = "audio/overload.mp3";
      bg = "#e53935";
      break;
    default:
      title = "Grenzbereich erreicht ⚠️";
      video = "video/Puls extreme.mp4"; // Video für extreme Werte
      sound = "audio/extreme.mp3";
      bg = "#b71c1c";
  }

  // Video und Titel einfügen
  worldContainer.innerHTML = `
    <div class="world">
      <h2>${title}</h2>
      <video width="100%" controls autoplay>
        <source src="${video}" type="video/mp4">
        Dein Browser unterstützt dieses Videoformat nicht.
      </video>
    </div>
  `;

  document.body.style.background = bg;

  // Sound abspielen
  playSound(sound);
}

function playSound(file) {
  const audio = new Audio(file);
  audio.play();
}

