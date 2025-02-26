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
const fileExplorer = document.querySelector('.file-explorer');
const folderIcon = document.querySelector('.fas.fa-folder').parentElement;
const explorerClose = document.querySelector('.file-explorer .window-controls .close');

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
let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let lastFrameTime = 0;

// Remplacer les événements de déplacement de fenêtre par :
browserWindow.addEventListener("mousedown", (e) => {
    // Vérifier si on clique sur la barre de titre (browser-header)
    const browserHeader = e.target.closest('.browser-header');
    if (!browserHeader || e.target.closest('.window-controls')) return;

    isDragging = true;
    initialX = e.clientX;
    initialY = e.clientY;

    currentX = browserWindow.offsetLeft;
    currentY = browserWindow.offsetTop;

    browserWindow.style.transition = 'none';
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    requestAnimationFrame(() => {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        // Limites de la fenêtre
        const maxX = window.innerWidth - browserWindow.offsetWidth;
        const maxY = window.innerHeight - browserWindow.offsetHeight - 60;

        browserWindow.style.left = `${Math.max(0, Math.min(maxX, newX))}px`;
        browserWindow.style.top = `${Math.max(0, Math.min(maxY, newY))}px`;
    });
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

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
    if (browserWindow.style.display === "none") {
        browserWindow.style.display = "flex";
    }

    const browserContent = document.querySelector('.browser-content');
    browserContent.classList.add('contact-page'); // Ajouter une classe spécifique pour la page de contact
    loadContactPageContent(browserContent);
    navigationHistory.push({ type: 'contact' });

    // Mettre à jour la barre d'URL
    const urlInput = document.querySelector('.url-bar input');
    urlInput.value = 'gdbuddy.com/contact';
}

// Nouvelle fonction pour le contenu de la page contact
function loadContactPageContent(container) {
    container.innerHTML = `
        <div class="contact-container">
            <div class="contact-header">
                <h1 class="contact-title">Contactez-nous</h1>
                <p class="contact-subtitle">Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question.</p>
            </div>
            <form class="contact-form" action="https://formspree.io/f/xdkozrld" method="POST" id="contactForm">
                <div class="form-group">
                    <input type="text" id="name" name="name" required>
                    <label for="name">Nom complet</label>
                    <div class="error-message" id="nameError"></div>
                </div>
                
                <div class="form-group">
                    <input type="email" id="email" name="email" required>
                    <label for="email">Adresse email</label>
                    <div class="error-message" id="emailError"></div>
                </div>
                
                <div class="form-group">
                    <input type="text" id="subject" name="subject" required>
                    <label for="subject">Sujet</label>
                    <div class="error-message" id="subjectError"></div>
                </div>
                
                <div class="form-group">
                    <textarea id="message" name="message" required></textarea>
                    <label for="message">Message</label>
                    <div class="error-message" id="messageError"></div>
                </div>
                
                <button type="submit" class="submit-btn">
                    <span>Envoyer le message</span>
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>

            <div class="contact-info-boxes">
                <div class="info-box">
                    <i class="fas fa-phone"></i>
                    <h3>Téléphone</h3>
                    <p>+33 6 12 34 56 78</p>
                </div>
                
                <div class="info-box">
                    <i class="fas fa-envelope"></i>
                    <h3>Email</h3>
                    <p>contact@gdbuddy.com</p>
                </div>
                
                <div class="info-box">
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>Adresse</h3>
                    <p>48 Rue des Canonniers, 59000 Lille</p>
                </div>
            </div>
        </div>
    `;

    // Validation du formulaire
    const form = container.querySelector('#contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Validation en temps réel
        input.addEventListener('input', () => validateField(input));
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm(form)) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-circle-notch"></i><span>Envoi en cours...</span>';
            
            try {
                const response = await submitForm(form);
                if (response.ok) {
                    showSuccessMessage(form);
                    form.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                showErrorMessage(form, 'Une erreur est survenue. Veuillez réessayer.');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Envoyer le message</span>';
            }
        }
    });
}

// Fonctions utilitaires pour la validation
function validateField(input) {
    const errorElement = document.getElementById(`${input.id}Error`);
    let isValid = true;
    let errorMessage = '';

    switch (input.id) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            errorMessage = 'Veuillez entrer une adresse email valide';
            break;
        case 'name':
            isValid = input.value.length >= 2;
            errorMessage = 'Le nom doit contenir au moins 2 caractères';
            break;
        case 'subject':
            isValid = input.value.length >= 3;
            errorMessage = 'Le sujet doit contenir au moins 3 caractères';
            break;
        case 'message':
            isValid = input.value.length >= 10;
            errorMessage = 'Le message doit contenir au moins 10 caractères';
            break;
    }

    if (!isValid && input.value) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    return isValid;
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

async function submitForm(form) {
    const formData = new FormData(form);
    return await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
}

function showSuccessMessage(form) {
    // Supprimer tout message de succès existant
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message envoyé avec succès !';
    
    // Ajouter le message directement au body pour qu'il soit au-dessus de tout
    document.body.appendChild(successMessage);

    // Nettoyer le message après l'animation
    setTimeout(() => {
        if (successMessage && successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 3000);
}

function showErrorMessage(form, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    form.parentElement.insertBefore(errorMessage, form);
    
    setTimeout(() => errorMessage.remove(), 5000);
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

folderIcon.addEventListener('click', () => {
    fileExplorer.style.display = 'flex';
    loadFiles();
});

explorerClose.addEventListener('click', () => {
    fileExplorer.style.display = 'none';
});

// Fonction pour charger les fichiers (exemple)
function loadFiles() {
    const explorerFiles = document.querySelector('.explorer-files');
    const files = [
        { name: 'Documents', icon: 'folder' },
        { name: 'Images', icon: 'folder-image' },
        { name: 'Projet.pdf', icon: 'file-pdf' },
        { name: 'Notes.txt', icon: 'file-alt' },
        { name: 'Photo.jpg', icon: 'file-image' }
    ];

    explorerFiles.innerHTML = files.map(file => `
        <div class="file-item">
            <i class="fas fa-${file.icon}"></i>
            <span>${file.name}</span>
        </div>
    `).join('');
}

// Rendre la fenêtre déplaçable
makeWindowDraggable(fileExplorer, '.explorer-header');

function makeWindowDraggable(element, handle) {
    const headerElement = element.querySelector(handle);
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    headerElement.addEventListener('mousedown', startDragging);

    function startDragging(e) {
        if (e.target.closest('.window-controls')) return;

        isDragging = true;
        initialX = e.clientX - element.offsetLeft;
        initialY = e.clientY - element.offsetTop;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        element.style.left = `${currentX}px`;
        element.style.top = `${currentY}px`;
    }

    function stopDragging() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDragging);
    }
}

// Configuration de l'explorateur de fichiers
const fileSystem = {
    home: {
        type: 'folder',
        children: {
            'Desktop': {
                type: 'folder',
                children: {
                    'Raccourci.lnk': { type: 'file', icon: 'file-code' }
                }
            },
            'Documents': {
                type: 'folder',
                children: {
                    'Projet.pdf': { type: 'file', icon: 'file-pdf' },
                    'Notes.txt': { type: 'file', icon: 'file-alt' }
                }
            },
            'Images': {
                type: 'folder',
                children: {
                    'Photo1.jpg': { type: 'file', icon: 'file-image' },
                    'Photo2.png': { type: 'file', icon: 'file-image' }
                }
            },
            'Téléchargements': {
                type: 'folder',
                children: {
                    'Installation.exe': { type: 'file', icon: 'file-code' }
                }
            }
        }
    }
};

const sidebarPaths = {
    'Accueil': ['home'],
    'Bureau': ['home', 'Desktop'],
    'Téléchargements': ['home', 'Downloads'],
    'Documents': ['home', 'Documents'],
    'Images': ['home', 'Images']
};

// Gestionnaire des clics de la barre latérale
document.querySelectorAll('.explorer-sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        // Retirer la classe active de tous les éléments
        document.querySelectorAll('.explorer-sidebar-item').forEach(el =>
            el.classList.remove('active'));

        // Ajouter la classe active à l'élément cliqué
        item.classList.add('active');

        // Obtenir le texte du span dans l'élément
        const pathName = item.querySelector('span').textContent;

        // Mettre à jour le chemin actuel
        if (sidebarPaths[pathName]) {
            currentPath = [...sidebarPaths[pathName]];
            updateExplorerContent();
        }
    });
});

let currentPath = ['home'];

function updateExplorerContent() {
    const explorerFiles = document.querySelector('.explorer-files');
    const pathDisplay = document.querySelector('.explorer-path');
    let currentFolder = fileSystem;

    // Naviguer vers le dossier actuel
    for (const segment of currentPath) {
        currentFolder = currentFolder[segment]?.children || {};
    }

    // Mettre à jour le chemin
    pathDisplay.innerHTML = currentPath.map((segment, index) => `
        <span class="path-segment" data-index="${index}">${segment}</span>
        ${index < currentPath.length - 1 ? '<span class="path-separator">/</span>' : ''}
    `).join('');

    // Afficher les fichiers et dossiers
    if (Object.keys(currentFolder).length === 0) {
        explorerFiles.innerHTML = '<div class="empty-folder">Ce dossier est vide</div>';
    } else {
        explorerFiles.innerHTML = Object.entries(currentFolder).map(([name, item]) => `
            <div class="file-item ${item.type}" data-name="${name}">
                <i class="fas fa-${item.type === 'folder' ? 'folder' : item.icon}"></i>
                <span>${name}</span>
            </div>
        `).join('');
    }

    // Ajouter les écouteurs d'événements
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.dataset.name;
            const fileInfo = currentFolder[name];

            if (fileInfo.type === 'folder') {
                currentPath.push(name);
                updateExplorerContent();
            } else {
                // Déterminer le type de fichier
                const extension = name.split('.').pop().toLowerCase();
                switch (extension) {
                    case 'jpg':
                    case 'png':
                    case 'gif':
                        openImageViewer(name);
                        break;
                    case 'pdf':
                        openPDFViewer(name);
                        break;
                    case 'txt':
                        openTextEditor(name);
                        break;
                    case 'lnk':
                    case 'exe':
                        // Simuler une exécution
                        alert(`Exécution de ${name}`);
                        break;
                }
            }
        });
    });

    document.querySelectorAll('.path-segment').forEach(segment => {
        segment.addEventListener('click', () => {
            const index = parseInt(segment.dataset.index);
            currentPath = currentPath.slice(0, index + 1);
            updateExplorerContent();
        });
    });
}

// Ajouter cette fonction pour gérer l'ouverture des fichiers
function openFile(fileType, fileName) {
    switch (fileType) {
        case 'image':
            openImageViewer(fileName);
            break;
        case 'pdf':
            openPDFViewer(fileName);
            break;
        case 'text':
            openTextEditor(fileName);
            break;
        case 'code':
            openCodeEditor(fileName);
            break;
    }
}

// Fonction pour ouvrir la visionneuse d'images avec déplacement
function openImageViewer(fileName) {
    const viewer = document.createElement('div');
    viewer.className = 'file-viewer image-viewer';
    viewer.style.position = 'fixed';
    viewer.style.zIndex = '9999';
    viewer.innerHTML = `
        <div class="viewer-header">
            <div class="viewer-title">${fileName}</div>
            <div class="window-controls">
                <span class="minimize">⎯</span>
                <span class="maximize">❐</span>
                <span class="close">⤬</span>
            </div>
        </div>
        <div class="viewer-content">
            <img src="/src/assets/images/${fileName}" alt="${fileName}" draggable="false" style="cursor: move;">
        </div>
    `;
    document.body.appendChild(viewer);

    // Rendre toute la fenêtre déplaçable
    makeWindowDraggable(viewer, '.viewer-header, .viewer-content');

    // Gestion du déplacement de l'image à l'intérieur de la visionneuse
    const img = viewer.querySelector('img');
    let isDraggingImage = false;
    let startX, startY, initialX, initialY;

    img.addEventListener('mousedown', (e) => {
        isDraggingImage = true;
        startX = e.clientX - viewer.offsetLeft;
        startY = e.clientY - viewer.offsetTop;

        // Position initiale de l'image
        initialX = img.offsetLeft;
        initialY = img.offsetTop;

        img.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDraggingImage) return;

        e.preventDefault();
        const x = e.clientX - startX;
        const y = e.clientY - startY;

        viewer.style.left = `${x}px`;
        viewer.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', () => {
        isDraggingImage = false;
        img.style.cursor = 'move';
    });

    // Gestionnaire pour fermer la visionneuse
    viewer.querySelector('.close').addEventListener('click', () => {
        viewer.remove();
    });

    // Position initiale centrée
    viewer.style.left = '50%';
    viewer.style.top = '50%';
    viewer.style.transform = 'translate(-50%, -50%)';
}

// Fonction pour ouvrir le lecteur PDF
function openPDFViewer(fileName) {
    const viewer = document.createElement('div');
    viewer.className = 'file-viewer pdf-viewer';
    viewer.innerHTML = `
        <div class="viewer-header">
            <div class="viewer-title">${fileName}</div>
            <div class="window-controls">
                <span class="minimize">⎯</span>
                <span class="maximize">❐</span>
                <span class="close">⤬</span>
            </div>
        </div>
        <div class="viewer-content">
            <embed src="/src/assets/documents/${fileName}" type="application/pdf" width="100%" height="100%">
        </div>
    `;
    document.body.appendChild(viewer);
    makeWindowDraggable(viewer, '.viewer-header');

    viewer.querySelector('.close').addEventListener('click', () => viewer.remove());
}

// Fonction pour ouvrir l'éditeur de texte
function openTextEditor(fileName) {
    const editor = document.createElement('div');
    editor.className = 'file-viewer text-editor';
    editor.innerHTML = `
        <div class="viewer-header">
            <div class="viewer-title">${fileName}</div>
            <div class="window-controls">
                <span class="minimize">⎯</span>
                <span class="maximize">❐</span>
                <span class="close">⤬</span>
            </div>
        </div>
        <div class="viewer-content">
            <textarea autofocus></textarea>
        </div>
    `;
    document.body.appendChild(editor);
    makeWindowDraggable(editor, '.viewer-header');

    editor.querySelector('.close').addEventListener('click', () => editor.remove());
}

// Gestionnaire de l'explorateur
folderIcon.addEventListener('click', () => {
    fileExplorer.style.display = 'flex';
    fileExplorer.style.top = '50%';
    fileExplorer.style.left = '50%';
    fileExplorer.style.transform = 'translate(-50%, -50%)';
    updateExplorerContent();
});

// Boutons de la barre d'outils
document.querySelectorAll('.toolbar-button').forEach(button => {
    button.addEventListener('click', () => {
        switch (button.dataset.action) {
            case 'back':
                if (currentPath.length > 1) {
                    currentPath.pop();
                    updateExplorerContent();
                }
                break;
            case 'up':
                if (currentPath.length > 1) {
                    currentPath.pop();
                    updateExplorerContent();
                }
                break;
            case 'refresh':
                updateExplorerContent();
                break;
        }
    });
});

// Remplacer la gestion de l'historique de navigation
const navigationHistory = {
    pages: [{ type: 'home' }], // Initialiser avec la page d'accueil
    currentIndex: 0,

    push(page) {
        if (!page || this.isCurrentPage(page)) return;

        this.pages = this.pages.slice(0, this.currentIndex + 1);
        this.pages.push(page);
        this.currentIndex++;
        this.updateButtons();
    },

    isCurrentPage(page) {
        const currentPage = this.pages[this.currentIndex];
        return currentPage && currentPage.type === page.type;
    },

    back() {
        if (this.canGoBack()) {
            this.currentIndex--;
            this.loadPage(this.pages[this.currentIndex]);
            this.updateButtons();
        }
    },

    forward() {
        if (this.canGoForward()) {
        this.currentIndex++;
        this.loadPage(this.pages[this.currentIndex]);
        this.updateButtons();
        }
    },

    canGoBack() {
        return this.currentIndex > 0;
    },

    canGoForward() {
        return this.currentIndex < this.pages.length - 1;
    },

    updateButtons() {
        const backButton = document.querySelector('.fa-arrow-left');
        const forwardButton = document.querySelector('.fa-arrow-right');

        if (backButton) backButton.style.opacity = this.canGoBack() ? '1' : '0.5';
        if (forwardButton) forwardButton.style.opacity = this.canGoForward() ? '1' : '0.5';
    },

    reload() {
        if (this.currentIndex >= 0 && this.currentIndex < this.pages.length) {
            this.loadPage(this.pages[this.currentIndex]);
        }
    },

    loadPage(page) {
        if (!page) return;

        const browserContent = document.querySelector('.browser-content');
        const urlInput = document.querySelector('.url-bar input');

        switch (page.type) {
            case 'home':
                browserContent.innerHTML = getHomePageContent();
                urlInput.value = 'gdbuddy.com';
                break;
            case 'contact':
                loadContactPageContent(browserContent);
                urlInput.value = 'gdbuddy.com/contact';
                break;
            // ... autres cas ...
        }
    }
};

// Modifier les gestionnaires d'événements pour les boutons de navigation
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.fa-arrow-left');
    const forwardButton = document.querySelector('.fa-arrow-right');
    const reloadButton = document.querySelector('.fa-redo');

    backButton?.addEventListener('click', () => navigationHistory.back());
    forwardButton?.addEventListener('click', () => navigationHistory.forward());
    reloadButton?.addEventListener('click', () => navigationHistory.reload());

    // Initialiser l'état des boutons
    navigationHistory.updateButtons();
});

// Ajouter les nouvelles fonctions de chargement de page
function loadProjectsPage() {
    const browserContent = document.querySelector('.browser-content');
    browserContent.classList.remove('contact-page'); // Retirer la classe
    browserContent.innerHTML = `
        <div class="projects-page">
            <h2>Mes Projets</h2>
            <!-- Contenu de la page projets -->
        </div>
    `;
    navigationHistory.push({ type: 'projects' });

    // Mettre à jour la barre d'URL
    const urlInput = document.querySelector('.url-bar input');
    urlInput.value = 'gdbuddy.com/projects';
}

function loadAboutPage() {
    const browserContent = document.querySelector('.browser-content');
    browserContent.classList.remove('contact-page'); // Retirer la classe
    browserContent.innerHTML = `
        <div class="about-page">
            <h2>À Propos de Moi</h2>
            <!-- Contenu de la page à propos -->
        </div>
    `;
    navigationHistory.push({ type: 'about' });

    // Mettre à jour la barre d'URL
    const urlInput = document.querySelector('.url-bar input');
    urlInput.value = 'gdbuddy.com/about';
}

function loadServicesPage() {
    const browserContent = document.querySelector('.browser-content');
    browserContent.classList.remove('contact-page'); // Retirer la classe
    browserContent.innerHTML = `
        <div class="services-page">
            <h2>Mes Services</h2>
            <!-- Contenu de la page services -->
        </div>
    `;
    navigationHistory.push({ type: 'services' });

    // Mettre à jour la barre d'URL
    const urlInput = document.querySelector('.url-bar input');
    urlInput.value = 'gdbuddy.com/services';
}

// Initialiser l'historique avec la page d'accueil lors de l'ouverture du navigateur
browserIcon.addEventListener('click', () => {
    if (browserWindow.style.display === 'none') {
        browserWindow.style.display = 'flex';
        navigationHistory.loadPage({ type: 'home' });
        navigationHistory.updateButtons();
    }
});

// Ajouter les gestionnaires d'événements pour les boutons de navigation
document.querySelector('.fa-arrow-left').addEventListener('click', () => {
    if (navigationHistory.canGoBack()) {
        navigationHistory.back();
    } else if (navigationHistory.currentIndex === -1) {
        // Si nous sommes au début de l'historique, charger la page d'accueil
        navigationHistory.push({ type: 'home' });
        navigationHistory.loadPage({ type: 'home' });
    }
});

document.querySelector('.fa-arrow-right').addEventListener('click', () => {
    navigationHistory.forward();
});

// Ajouter le gestionnaire pour le bouton rafraîchir
document.querySelector('.fa-redo').addEventListener('click', () => {
    const currentPage = navigationHistory.pages[navigationHistory.currentIndex];
    navigationHistory.loadPage(currentPage || { type: 'home' });
});

// Fonction pour obtenir le contenu de la page d'accueil
function getHomePageContent() {
    const browserContent = document.querySelector('.browser-content');
    browserContent.classList.remove('contact-page'); // Retirer la classe
    return `
        <div class="browser-homepage">
            <div class="info-header">
                <img src="/src/assets/profile.png" alt="Profile">
                <div class="info-header-content">
                    <h1>Amando Ruiz</h1>
                    <p>Développeuse Web</p>
                </div>
            </div>
            
            <div class="menu-container">
                <div class="menu-item" onclick="loadContactPage()">
                    <i class="fas fa-address-book"></i>
                    <div class="menu-item-title">Contact</div>
                </div>
                <div class="menu-item" onclick="loadProjectsPage()">
                    <i class="fas fa-project-diagram"></i>
                    <div class="menu-item-title">Projets</div>
                </div>
                <div class="menu-item" onclick="loadAboutPage()">
                    <i class="fas fa-user-circle"></i>
                    <div class="menu-item-title">À propos</div>
                </div>
                <div class="menu-item" onclick="loadServicesPage()">
                    <i class="fas fa-cog"></i>
                    <div class="menu-item-title">Services</div>
                </div>
            </div>
        </div>
    `;
}

// Chargement des résultats de recherche
function loadSearchResults(query) {
    const browserContent = document.querySelector('.browser-content');
    // Simulation de résultats de recherche
    browserContent.innerHTML = `
        <div class="search-results">
            <h2>Résultats pour : ${query}</h2>
            <!-- Ajoutez ici vos résultats de recherche simulés -->
        </div>
    `;
}

// Chargement des services
function loadService(service) {
    const browserContent = document.querySelector('.browser-content');
    browserContent.innerHTML = `
        <div class="service-page">
            <h2>Chargement de ${service}...</h2>
            <!-- Ajoutez ici le contenu spécifique au service -->
        </div>
    `;
}

// Initialiser le navigateur au chargement
browserIcon.addEventListener('click', () => {
    if (browserWindow.style.display === 'none') {
        browserWindow.style.display = 'flex';
        initBrowser();
    }
});

// Supprimer ou remplacer ces lignes qui causent l'erreur
/*
document.querySelector('.contact-button').addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
});

document.querySelector('.contact-button').addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
});
*/

// Si vous voulez garder la fonctionnalité, modifiez le sélecteur pour cibler le bon élément,
// par exemple le bouton submit du formulaire de contact :
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});
