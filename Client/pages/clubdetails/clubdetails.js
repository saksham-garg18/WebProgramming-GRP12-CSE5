const clubDetailsUrl = '../../data.json';
const defaultLogo = '../../assets/nexus_logo.png';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadClubDetails() {
    const clubEmail = getQueryParam('clubemail');
    if (!clubEmail) {
        console.error("Club Email not specified in the URL.");
        return;
    }

    try {
        const response = await fetch(clubDetailsUrl);
        const clubs = await response.json();
        const club = clubs.find(c => c.club_email === clubEmail);

        if (!club) {
            console.error("Club not found.");
            return;
        }

        console.log("Club found:", club);

        document.querySelector('.logo-con img').src = club.logo || defaultLogo;
        document.querySelector('.title-con span').textContent = club.name;
        document.querySelector('.phone-con span').textContent = club.phone;
        document.querySelector('.phone-a').href = `tel:${club.phone}`;
        document.querySelector('.motto-con span').textContent = club.motto;
        document.querySelector('.ig-con span').textContent = `${club.name}` + " - Instagram";
        document.querySelector('.insta-a').href = club.insta;
        document.querySelector('.email-con span').textContent = club.club_email;
        document.querySelector('.email-a').href = `mailto:${club.club_email}`;
        document.querySelector('.linkedin-s').textContent = `${club.name}` + " - LinkedIn";
        document.querySelector('.linkedin-a').href = club.linkedin;
        document.querySelector('#about .conttext-con').textContent = club.about;
        document.querySelector('#whyus .conttext-con').textContent = club.whyus;
        document.querySelector('#milestones .conttext-con').textContent = club.milestones;

    } catch (error) {
        console.error("Error loading club details:", error);
    }
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadClubDetails);