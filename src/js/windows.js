const startButton = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");
const browserIcon = document.getElementById("browser-icon");
const browserWindow = document.getElementById("browser-window");
const closeButton = document.querySelector("#browser-window .window-controls .close");
const minimizeButton = document.querySelector("#browser-window .window-controls .minimize");
const maximizeButton = document.querySelector("#browser-window .window-controls .maximize");
const contextMenu = document.getElementById("context-menu");
const body = document.querySelector("body");
const profileButton = document.querySelector('.footer-button i.fas.fa-user-circle');
const profileMenu = document.getElementById('profile-menu');
const profileHeader = document.getElementById('profile-header');
const closeProfileBtn = document.querySelector('.profile-menu .window-controls .close');
const minimizeProfileBtn = document.querySelector('.profile-menu .window-controls .minimize');
const maximizeProfileBtn = document.querySelector('.profile-menu .window-controls .maximize');
const terminalIcon = document.getElementById('terminal-icon');
const terminalWindow = document.getElementById('terminal-window');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
// Afficher / cacher le menu démarrer
startButton.addEventListener("click", () => toggleMenu(startMenu));
// Mise à jour de l'heure et de la date
function updateClock() {
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");
    const now = new Date();
    clock.textContent = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    date.textContent = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`;
}

setInterval(updateClock, 1000);
updateClock();
// Fonction pour afficher/masquer le menu
function toggleMenu(menu) {
    menu.classList.toggle('show');
}
// Fonction de fermeture de la fenêtre
closeButton.addEventListener("click", () => window.location.href = '/');
// Ouvrir / fermer la fenêtre du navigateur
browserIcon.addEventListener("click", () => toggleWindowVisibility(browserWindow));
// Fermeture de la fenêtre du navigateur
closeButton.addEventListener("click", () => browserWindow.style.display = "none");
// Minimise la fenêtre
minimizeButton.addEventListener("click", () => browserWindow.style.display = "none");
// Maximiser la fenêtre
maximizeButton.addEventListener("click", () => toggleWindowSize(browserWindow));
// Charger une page factice
function loadFakePage(page) {
    if (page === 'Drive') {
        window.location.href = './../src/index.html';
    }
}
// Fonction de redimensionnement de la fenêtre
function toggleWindowSize(windowElement) {
    const isMaximized = windowElement.style.width === "100vw" && windowElement.style.height === "100vh";
    if (isMaximized) {
        windowElement.style.width = "800px"; // Largeur par défaut
        windowElement.style.height = "600px"; // Hauteur par défaut
        windowElement.style.top = "50px"; // Position par défaut
        windowElement.style.left = "50px"; // Position par défaut
    } else {
        // Maximisation dynamique
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight - 60; // Soustraire la hauteur de la barre des tâches ou éléments de l'interface
        // Limiter la taille maximale de la fenêtre
        const newWidth = Math.min(maxWidth, 1200); // Largeur max de la fenêtre
        const newHeight = Math.min(maxHeight, 800); // Hauteur max de la fenêtre
        windowElement.style.width = `${newWidth}px`;
        windowElement.style.height = `${newHeight}px`;
        // Centrer la fenêtre
        const centerX = (window.innerWidth - newWidth) / 2;
        const centerY = (window.innerHeight - newHeight) / 2;
        windowElement.style.top = `${centerY}px`;
        windowElement.style.left = `${centerX}px`;
    }
}
// Fonction de déplacement de la fenêtre
let isDragging = false, offsetX, offsetY;
browserWindow.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - browserWindow.offsetLeft;
    offsetY = e.clientY - browserWindow.offsetTop;
});
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        moveWindow(e);
    }
});
document.addEventListener("mouseup", () => isDragging = false);

function moveWindow(e) {
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;
    // Empêcher la fenêtre de dépasser la barre des tâches
    newY = Math.max(0, Math.min(window.innerHeight - browserWindow.offsetHeight - 60, newY)); // Ajustez `60` pour correspondre à la hauteur de votre barre des tâches
    // Limiter le déplacement à l'écran
    newX = Math.max(0, Math.min(window.innerWidth - browserWindow.offsetWidth, newX));
    browserWindow.style.left = `${newX}px`;
    browserWindow.style.top = `${newY}px`;
}
// Menu contextuel
body.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.display = "block";
});

body.addEventListener("click", () => contextMenu.style.display = "none");
// Réajuster la taille de la fenêtre lors du redimensionnement
window.addEventListener("resize", () => {
    const browserWindow = document.getElementById("browser-window");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    browserWindow.style.width = `${Math.min(windowWidth - 100, 800)}px`; // Limite la taille de la fenêtre à 800px de large
    browserWindow.style.height = `${Math.min(windowHeight - 100, 600)}px`; // Limite la taille de la fenêtre à 600px de haut
});

// Gestion de la visibilité de la fenêtre du navigateur
function toggleWindowVisibility(windowElement) {
    windowElement.style.display = windowElement.style.display === "flex" ? "none" : "flex";
}
document.addEventListener("click", (event) => {
    const isClickInsideMenu = startMenu.contains(event.target) || startButton.contains(event.target);

    if (!isClickInsideMenu) {
        startMenu.classList.remove("show");
    }
});
// Profil menu (afficher/masquer)
profileButton.addEventListener('click', () => profileMenu.classList.toggle('show'));
closeProfileBtn.addEventListener('click', () => profileMenu.classList.remove('show'));
minimizeProfileBtn.addEventListener('click', () => profileMenu.classList.remove('show'));
maximizeProfileBtn.addEventListener('click', () => toggleProfileMenuSize(profileMenu));

// Fonction de redimensionnement de la fenêtre
function toggleWindowSize(windowElement) {
    const isMaximized = windowElement.style.width === "100vw" && windowElement.style.height === "100vh";
    if (isMaximized) {
        windowElement.style.width = "800px"; // Largeur par défaut
        windowElement.style.height = "600px"; // Hauteur par défaut
        windowElement.style.top = "50px"; // Position par défaut
        windowElement.style.left = "50px"; // Position par défaut
    } else {
        // Maximisation dynamique
        const maxWidth = window.innerWidth; // Largeur maximale de la fenêtre
        const maxHeight = window.innerHeight - 60; // Hauteur maximale de la fenêtre, en soustrayant la barre des tâches
        // Limiter la taille maximale de la fenêtre
        const newWidth = Math.min(maxWidth, 1200); // Largeur max de la fenêtre
        const newHeight = Math.min(maxHeight, 800); // Hauteur max de la fenêtre
        windowElement.style.width = `${newWidth}px`;
        windowElement.style.height = `${newHeight}px`;
        // Centrer la fenêtre
        const centerX = (window.innerWidth - newWidth) / 2;
        let centerY = (window.innerHeight - newHeight) / 2;
        // Décaler légèrement vers le haut
        centerY -= 30;  // Ajustez cette valeur pour contrôler le décalage vertical
        windowElement.style.top = `${centerY}px`;
        windowElement.style.left = `${centerX}px`;
    }
}
// Fermeture du menu démarrer si on clique en dehors
document.addEventListener("click", (event) => {
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.classList.remove("show");
    }
});
// Chargement de la page Contact
function loadContactPage() {
    if (browserWindow.style.display === "none") browserWindow.style.display = "flex";
    const head = document.querySelector('head');
    let contactStyle = document.querySelector('link[data-page="contact"]');
    if (!contactStyle) {
        contactStyle = document.createElement('link');
        contactStyle.rel = 'stylesheet';
        contactStyle.href = '/src/styles/contact.css';
        contactStyle.setAttribute('data-page', 'contact');
        head.appendChild(contactStyle);
    }
    const browserContent = document.querySelector('.browser-content');
    browserContent.innerHTML = `
<section id="contact-form" class="max-w-4xl mx-auto p-8 py-16 bg-white shadow-xl rounded-lg">
    <h2 id="contact-title" class="text-3xl font-semibold text-center text-gray-800 mb-8">Contactez-moi</h2>
    <form id="contact-form" action="https://formspree.io/f/xdkozrld" method="POST" class="space-y-6 bg-white p-8 shadow-xl rounded-lg">
        <div id="name-field">
            <label for="name" class="block text-gray-600 font-semibold">Nom</label>
            <input type="text" id="name" name="name" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
        </div>
        <div id="email-field">
            <label for="email" class="block text-gray-600 font-semibold">Email</label>
            <input type="email" id="email" name="email" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
        </div>
        <div id="message-field">
            <label for="message" class="block text-gray-600 font-semibold">Message</label>
            <textarea id="message" name="message" rows="6" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
        </div>
        <div class="flex justify-center">
            <button type="submit" id="submit-button" class="w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-3 rounded-lg transition-all duration-300">Envoyer</button>
        </div>
    </form>
</section>
    `;
       // Change the URL in the browser's address bar without reloading the page
       window.history.pushState({ page: 'contact' }, 'Contact', '/contact');
       // Update the URL bar value to display the correct path
       const urlBar = document.querySelector('.url-bar input');
       urlBar.value = 'www.GDbuddy.com/contact';
}
// Lors du clic sur l'icône du terminal, afficher ou masquer la fenêtre
terminalIcon.addEventListener('click', () => {
    if (terminalWindow.style.display === 'none' || !terminalWindow.style.display) {
        terminalWindow.style.display = 'block';
        terminalWindow.style.animation = 'slideInFromBottom 0.5s forwards, fadeIn 0.3s forwards';
    } else {
        terminalWindow.style.display = 'none';
    }
});
// Sélectionner le bouton de fermeture du terminal
const closeTerminalButton = document.querySelector("#terminal-window .window-controls .close");
// Ajouter l'événement pour fermer le terminal
closeTerminalButton.addEventListener('click', () => {
    terminalWindow.style.display = 'none';
    terminalOutput.innerHTML = '';  // Efface le contenu du terminal
    // Réinitialiser l'invite
    terminalOutput.innerHTML = `<span style="color: #00ff00;">root@user:~$ </span>`;  // Affiche l'invite initiale
});
// Afficher l'invite initiale lorsque le terminal est ouvert
window.onload = () => {
    terminalOutput.innerHTML = `<span style="color: #00ff00;">root@user:~$ </span>`;  // Affiche l'invite initiale en vert
};
// Fonction pour simuler l'écriture d'une commande dans le terminal
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim();
        if (command) {
            // Afficher la commande tapée en blanc, sans ajouter de nouvelle invite ici
            displayCommand(command);
            terminalInput.value = ''; // Réinitialiser l'input
            simulateTerminalResponse(command); // Simuler la réponse du terminal
        }
    }
});
// Affiche la commande tapée à côté de l'invite root@user:~$
function displayCommand(command) {
    // Ajouter la commande en blanc à côté de l'invite root@user:~$
    terminalOutput.innerHTML += `<span style="color: white;">${command}</span><br>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll vers le bas
}
// Simule la réponse du terminal après la commande
function simulateTerminalResponse(command) {
    setTimeout(() => {
        // Si la commande est inconnue, simuler une erreur comme dans un terminal
        if (command !== 'df') {
            terminalOutput.innerHTML += `'${command}' n’est pas reconnu en tant que commande interne ou externe, un programme exécutable ou un fichier de commandes.<br>`;
        } else {
            // Vous pouvez ajouter des réponses spécifiques ici pour certaines commandes
            terminalOutput.innerHTML += `Réponse : Commande '${command}' exécutée avec succès.<br>`;
        }
        // Ajouter une nouvelle invite pour la prochaine commande
        terminalOutput.innerHTML += `<span style="color: #00ff00;">root@user:~$ </span>`; // Ajout de l'invite en vert
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll vers le bas
    }, 500);
}
