// Récupère les projets depuis l'API
fetch("/src/api/projects")
  .then(response => response.json())
  .then(projets => {
    const projectsList = document.getElementById("projects-list");
    projets.forEach(projet => {
      const card = createProjectCard(projet);
      projectsList.appendChild(card);
    });
  })
  .catch(handleFetchError);

function createProjectCard(projet) {
  const card = document.createElement("div");
  card.classList.add("project-card");

  const image = document.createElement("img");
  image.src = `/src/projects/${projet.path}/image.jpg`;
  image.alt = projet.name;

  const title = document.createElement("h3");
  title.textContent = projet.name.replace(/-/g, ' ');
  title.style.fontSize = "0.7rem";

  card.appendChild(image);
  card.appendChild(title);

  card.addEventListener('click', function() {
    window.location.href = `/src/projects/${projet.path}/index.html`;
  });

  return card;
}

function handleFetchError(error) {
  console.error("Erreur lors de la récupération des projets:", error);
}

function loadFakePage(page) {
  // Masque tout le contenu existant et affiche la page demandée
  document.querySelectorAll('.menu-item').forEach(function (item) {
    item.style.display = 'none';
  });
  alert('Vous avez sélectionné ' + page);
}


