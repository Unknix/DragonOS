// Ouvrir le calendrier
const dateTimeElement = document.getElementById('date-time');
const calendarElement = document.getElementById('custom-calendar');
const currentMonthElement = document.getElementById('current-month');
const calendarDaysElement = document.querySelector('.calendar-days');

dateTimeElement.addEventListener('click', () => {
    // Afficher ou cacher le calendrier avec animation
    if (calendarElement.style.display === 'none' || calendarElement.style.display === '') {
        calendarElement.style.display = 'block'; // S'assurer que le calendrier est visible avant l'animation
        setTimeout(() => calendarElement.classList.add('show'), 10); // Ajouter la classe 'show' pour l'animation
    } else {
        calendarElement.classList.remove('show'); // Retirer l'animation
        setTimeout(() => {
            calendarElement.style.display = 'none'; // Cacher le calendrier après l'animation
        }, 500); // Temps d'animation (0.5s)
    }
    loadCalendar(); // Charger le calendrier
});

// Fonction pour charger le calendrier pour le mois en cours
let currentDate = new Date(); // Le jour actuel
function loadCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    currentMonthElement.innerText = `${getMonthName(month)} ${year}`;

    // Effacer les anciens jours
    calendarDaysElement.innerHTML = '';

    // Obtenir le premier jour du mois et le nombre de jours dans ce mois
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Ajouter les jours du mois
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarDaysElement.appendChild(document.createElement('span')); // Ajouter des cases vides pour les jours précédents
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('span');
        dayElement.innerText = day;

        // Vérifier si c'est le jour actuel dans le mois affiché
        if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayElement.classList.add('current-day'); // Ajouter une classe spéciale pour le jour actuel uniquement si c'est le mois actuel
        }

        dayElement.addEventListener('click', () => {
            alert(`Vous avez sélectionné le ${day} ${getMonthName(month)} ${year}`);
        });

        calendarDaysElement.appendChild(dayElement);
    }
}

// Fonction pour obtenir le nom du mois
function getMonthName(month) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[month];
}

// Gérer la navigation entre les mois
document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar();
});

document.addEventListener('click', (e) => {
    if (!calendarElement.contains(e.target) && !dateTimeElement.contains(e.target)) {
        calendarElement.classList.remove('show'); // Retirer l'animation
        setTimeout(() => {
            calendarElement.style.display = 'none'; // Cacher le calendrier après l'animation
        }, 500);
    }
});
