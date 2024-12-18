// Liste de mots technologiques en français
const words = [
  "ordinateur", "javascript", "developpeur", "logiciel", "internet",
  "programmation", "algorithme", "technologie", "interface", "navigateurs",
  "processeur", "reseau", "systeme", "cloud", "serveur", "client",
  "utilisateur", "machine", "langage", "code", "robotique",
  "intelligence", "artificielle", "cryptographie", "donnees",
  "virtualisation", "cybersecurite", "framework", "microservices",
  "kubernetes", "docker", "nodejs", "react", "typescript"
];

class HangmanGame {
  constructor() {
    this.canvas = document.getElementById("hangman");
    this.ctx = this.canvas.getContext("2d");
    this.wordEl = document.getElementById("word");
    this.lettersEl = document.getElementById("letters");
    this.errorsEl = document.getElementById("errors");
    this.messageEl = document.getElementById("message");
    this.resetBtn = document.getElementById("reset");

    this.maxErrors = 6;
    this.resetGame();
    this.initEventListeners();
  }

  generateWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  initEventListeners() {
    this.resetBtn.addEventListener("click", () => this.resetGame());
  }

  updateDisplayedWord() {
    this.wordEl.textContent = this.displayedWord.join(" ");
  }

  generateLetterButtons() {
    this.lettersEl.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => this.handleGuess(letter));
      this.lettersEl.appendChild(button);
    }
  }

  handleGuess(letter) {
    const button = Array.from(this.lettersEl.children).find(b => b.textContent === letter);
    if (button.disabled) return;

    button.disabled = true;

    if (this.selectedWord.includes(letter.toLowerCase())) {
      this.selectedWord.split("").forEach((char, index) => {
        if (char === letter.toLowerCase()) {
          this.displayedWord[index] = letter;
        }
      });
      this.updateDisplayedWord();

      if (!this.displayedWord.includes("_")) {
        this.endGame(true);
      }
    } else {
      this.errors++;
      this.errorsEl.textContent = this.errors;
      this.drawHangman();

      if (this.errors >= this.maxErrors) {
        this.endGame(false);
      }
    }
  }

  endGame(isWin) {
    this.disableAllButtons();
    this.resetBtn.style.display = "block";

    if (isWin) {
      this.messageEl.textContent = "Félicitations, vous avez gagné !";
      this.messageEl.classList.add("win");
      this.playConfetti();
    } else {
      this.messageEl.textContent = `Vous avez perdu ! Le mot était "${this.selectedWord}".`;
    }
  }

  disableAllButtons() {
    const buttons = this.lettersEl.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);
  }

  resetGame() {
    this.errors = 0;
    this.selectedWord = this.generateWord();
    this.displayedWord = Array(this.selectedWord.length).fill("_");

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGallows();
    this.updateDisplayedWord();
    this.generateLetterButtons();

    this.errorsEl.textContent = this.errors;
    this.messageEl.textContent = "";
    this.resetBtn.style.display = "none";
  }

  drawHangman() {
    const drawFunctions = [
      this.drawHead.bind(this),
      this.drawBody.bind(this),
      this.drawLeftArm.bind(this),
      this.drawRightArm.bind(this),
      this.drawLeftLeg.bind(this),
      this.drawRightLeg.bind(this)
    ];

    if (this.errors > 0 && this.errors <= drawFunctions.length) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#333";
      this.ctx.lineWidth = 3;
      drawFunctions[this.errors - 1]();
      this.ctx.stroke();
    }
  }

  drawGallows() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 5;

    // Base
    this.ctx.moveTo(50, 380);
    this.ctx.lineTo(250, 380);

    // Vertical pole
    this.ctx.moveTo(150, 380);
    this.ctx.lineTo(150, 50);

    // Horizontal pole
    this.ctx.moveTo(150, 50);
    this.ctx.lineTo(250, 50);

    // Rope
    this.ctx.moveTo(250, 50);
    this.ctx.lineTo(250, 100);

    this.ctx.stroke();
  }

  drawHead() {
    // Head
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(250, 130, 30, 0, Math.PI * 2);
    this.ctx.fillStyle = "#F2C9AC";
    this.ctx.fill();

    // Eyes
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    // Left eye
    this.ctx.arc(235, 120, 3, 0, Math.PI * 2);
    // Right eye
    this.ctx.arc(265, 120, 3, 0, Math.PI * 2);
    this.ctx.fill();

    // Sad mouth
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.moveTo(235, 145);
    this.ctx.quadraticCurveTo(250, 155, 265, 145);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawBody() {
    // Body
    this.ctx.beginPath();
    this.ctx.moveTo(250, 160);
    this.ctx.lineTo(250, 250);
  }

  drawLeftArm() {
    // Left arm
    this.ctx.beginPath();
    this.ctx.moveTo(250, 190);
    this.ctx.lineTo(220, 230);
  }

  drawRightArm() {
    // Right arm
    this.ctx.beginPath();
    this.ctx.moveTo(250, 190);
    this.ctx.lineTo(280, 230);
  }

  drawLeftLeg() {
    // Left leg
    this.ctx.beginPath();
    this.ctx.moveTo(250, 250);
    this.ctx.lineTo(220, 300);
  }

  drawRightLeg() {
    // Right leg
    this.ctx.beginPath();
    this.ctx.moveTo(250, 250);
    this.ctx.lineTo(280, 300);
  }

  playConfetti() {
    // Augmenter le nombre et la variété des confettis
    const confettiColors = [
      '#ff0a54', '#ff477e', '#ff7096', '#ff85a2', '#fbb1bd', '#f9bec7',
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9d5e5', '#eeac99', '#eb4d4b'
    ];

    // Créer des confettis de différentes directions et avec plus de particules
    for (let i = 0; i < 200; i++) {
      window.confetti({
        particleCount: Math.floor(Math.random() * 3) + 2,
        angle: Math.random() * 360,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() },
        colors: [confettiColors[Math.floor(Math.random() * confettiColors.length)]],
        scalar: Math.random() * 1.5 + 0.5
      });
    }

    // Ajouter quelques effets spéciaux
    for (let i = 0; i < 5; i++) {
      window.confetti({
        particleCount: 50,
        angle: 60,
        spread: 180,
        origin: { x: 0 },
        colors: confettiColors
      });
      window.confetti({
        particleCount: 50,
        angle: 120,
        spread: 180,
        origin: { x: 1 },
        colors: confettiColors
      });
    }
  }
}

// Initialiser le jeu une fois que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  new HangmanGame();
});


function goBack() {
  window.history.back();
}
