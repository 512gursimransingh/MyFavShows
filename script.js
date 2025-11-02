const shows = {
  "Friends": {
    emoji: "🛋",
    seasons: {
      1: { count: 24, trivia: ["Introduces all six main characters.", "Rachel starts her new life."] },
      2: { count: 24, trivia: ["Ross deals with jealousy.", "Monica and Richard’s romance begins."] },
      10: { count: 18, trivia: ["Final endings and moving on.", "Series finale — goodbyes."] }
    }
  },
  "Big Bang Theory": {
    emoji: "🔬",
    seasons: {
      1: { count: 17, trivia: ["Introduces Sheldon and Leonard.", "Raj can’t talk to women."] },
      12: { count: 24, trivia: ["Finale — goodbyes.", "The group moves forward."] }
    }
  }
};

const resultModal = document.getElementById("resultModal");
const resultContent = document.getElementById("resultContent");
const spinSound = new Audio("https://www.soundjay.com/button/beep-07.wav");

function spin() {
  spinSound.currentTime = 0;
  spinSound.play().catch(() => {});
  if (navigator.vibrate) navigator.vibrate(150);

  const showNames = Object.keys(shows);
  const show = showNames[Math.floor(Math.random() * showNames.length)];
  const seasons = Object.keys(shows[show].seasons);
  const season = seasons[Math.floor(Math.random() * seasons.length)];
  const episodesInSeason = shows[show].seasons[season].count;
  const episode = Math.floor(Math.random() * episodesInSeason) + 1;
  const seasonTrivia = shows[show].seasons[season].trivia;
  const triviaHTML = seasonTrivia && seasonTrivia.length > 0
    ? `<em><strong>Season Trivia:</strong> ${seasonTrivia[Math.floor(Math.random() * seasonTrivia.length)]}</em>`
    : "";

  resultContent.innerHTML = `
    <button id="closeBtn" onclick="closePopup()">✖</button>
    <span class="emoji">${shows[show].emoji}</span>
    Watch <strong>${show}</strong><br>
    Season ${season}, Episode ${episode}
    ${triviaHTML}
  `;

  resultModal.classList.add("show");
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

function closePopup() {
  resultModal.classList.remove("show");
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}
