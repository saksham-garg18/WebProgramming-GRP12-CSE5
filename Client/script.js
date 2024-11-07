// Path to your JSON file
const clubsDataUrl = '../../data/clubs.json';

// Default logo URL
const defaultLogo = '../../components/default-logo.png';

// Container for the club cards
const clubCardsContainer = document.querySelector('.clubcards');

// Fetch and display club data
async function loadClubData() {
    try {
        const response = await fetch(clubsDataUrl);
        const clubs = await response.json();

        clubs.forEach(club => {
            // Create card element
            const clubCard = document.createElement('a');
            clubCard.href = "../clubdetails/clubdetails.html";
            clubCard.classList.add('tcard', 'idcard');

            // Create logo and name elements
            const logo = club.logo ? club.logo : defaultLogo;
            clubCard.innerHTML = `
                    <div class='club-icon'>
                        <img src="${logo}" alt="${club.name}">
                    </div>
                    <div class="name">
                        ${club.name}
                    </div>
                `;

            // Append card to container
            clubCardsContainer.appendChild(clubCard);
        });
    } catch (error) {
        console.error("Error loading club data:", error);
    }
}

// Load data when the page loads
loadClubData();