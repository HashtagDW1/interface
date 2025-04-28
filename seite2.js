document.getElementById('submitPulse').addEventListener('click', function() {
    const pulse = document.getElementById('pulseInput').value;
    const worldContainer = document.getElementById('worldContainer');

    worldContainer.innerHTML = ""; // Leeren, falls schon etwas drin ist

    if (pulse < 90) {
        // Ruhige Welt
        worldContainer.innerHTML = `
            <div class="calm-world">
                <h2>Willkommen in deiner ruhigen Welt 🌸</h2>
                <img src="calm_landscape.jpg" alt="Ruhige Landschaft" class="landscape-image">
            </div>
        `;
        document.body.style.background = "linear-gradient(135deg, #A8EDDF 0%, #FED6E3 100%)";
        playCalmSound();
    } else {
        // Aggressive Welt
        worldContainer.innerHTML = `
            <div class="aggressive-world">
                <h2>Willkommen in deiner wilden Welt 🔥</h2>
                <img src="aggressive_landscape.jpg" alt="Aggressive Landschaft" class="landscape-image">
            </div>
        `;
        document.body.style.background = "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)";
        playAggressiveSound();
    }
});

function playCalmSound() {
    const calmAudio = new Audio('calm_music.mp3');
    calmAudio.play();
}

function playAggressiveSound() {
    const aggressiveAudio = new Audio('aggressive_music.mp3');
    aggressiveAudio.play();
}

