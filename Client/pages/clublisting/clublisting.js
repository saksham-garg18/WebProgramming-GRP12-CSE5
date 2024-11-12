
const clubsDataUrl = '../../data.json';

const defaultLogo = '../../assets/nexus_logo.png';

const clubCardsContainer = document.querySelector('.clubcards');
const searchInput = document.querySelector('.cl-search-text');

let clubs = [];

async function loadClubData() {
try {
    const response = await fetch(clubsDataUrl);
    clubs = await response.json();
    displayClubs(clubs);
} catch (error) {
  console.error("Error loading club data:", error);
}
}

function displayClubs(clubsToDisplay) {
clubsToDisplay.sort((a, b) => a.name.localeCompare(b.name));
clubCardsContainer.innerHTML = "";

clubsToDisplay.forEach(club => {
    const clubCard = document.createElement('a');
    clubCard.href = `../clubdetails/clubdetails.html?clubemail=${club.club_email}`;
    clubCard.classList.add('tcard', 'idcard');

    const logo = club.logo ? club.logo : defaultLogo;
    clubCard.innerHTML = `
        <div class='club-icon'>
            <img src="${logo}" alt="${club.name}">
        </div>
        <div class="name">
            ${club.name}
        </div>
    `;

    clubCardsContainer.appendChild(clubCard);
});
}

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(query));
    displayClubs(filteredClubs);
}

searchInput.addEventListener('input', handleSearch);

loadClubData();