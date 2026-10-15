// Dodaj projekt raz — filtr „Wszystkie” uwzględni go automatycznie.
// category: 'personal' (moje projekty) lub 'client' (projekty klientów).
// github i live są opcjonalne. Kolejność na liście odpowiada kolejności kart.
export const projectCategories = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'personal', label: 'Moje projekty' },
    { id: 'client', label: 'Projekty klientów' },
];

export const projects = [
    {
        id: 'storvi',
        name: 'Storvi',
        category: 'personal',
        imgSrc: 'img/storvi.png',
        github: 'https://github.com/PrzemekAbramowicz/Storvi',
        live: 'https://storvi.netlify.app/',
    },
    {
        id: 'movie-app',
        name: 'Movie App',
        category: 'personal',
        imgSrc: 'img/movie-app.png',
        github: 'https://github.com/PrzemekAbramowicz/Movie-app',
        live: 'https://dev-movie-app.netlify.app/',
    },
    {
        id: 'brainwave',
        name: 'Brainwave',
        category: 'personal',
        imgSrc: 'img/brainwave.png',
        github: 'https://github.com/PrzemekAbramowicz/Brainwave',
        live: 'https://brainwave-six-phi.vercel.app/',
    },
    {
        id: 'client-crm',
        name: 'Client CRM',
        category: 'personal',
        imgSrc: 'img/clients-crm.png',
        github: 'https://github.com/PrzemekAbramowicz/Clients-CRM',
    },
    {
        id: 'tropical-paradise',
        name: 'Tropical paradise',
        category: 'personal',
        imgSrc: 'img/tropical_paradise.png',
        github: 'https://github.com/PrzemekAbramowicz/Tropical-paradise',
        live: 'https://przemekabramowicz.github.io/Tropical-paradise/',
    },
    {
        id: 'great-evening',
        name: 'Great Evening',
        category: 'personal',
        imgSrc: 'img/great-evening.png',
        github: 'https://github.com/PrzemekAbramowicz/great-evening/',
        live: 'https://przemekabramowicz.github.io/great-evening/',
    },
    {
        id: 'sklep-notte',
        name: 'Sklep Notte',
        category: 'client',
        imgSrc: 'img/sklep-notte.png',
        live: 'https://sklep.notte.pl/',
    },
    {
        id: 'planet-pay',
        name: 'Planet Pay',
        category: 'client',
        imgSrc: 'img/planetpay.png',
        live: 'https://planetpay.pl/',
    },
    {
        id: 'itcard',
        name: 'ITCARD',
        category: 'client',
        imgSrc: 'img/itcard.png',
        live: 'https://itcard.pl/',
    },
    {
        id: 'safety-cloud-hub',
        name: 'Safety Cloud Hub',
        category: 'client',
        imgSrc: 'img/safetycloudhub.png',
        live: 'https://safetycloudhub.com/',
    },
    {
        id: 'animalactin',
        name: 'Animalactin',
        category: 'client',
        imgSrc: 'img/animalactin.png',
        live: 'https://animalactin.eu/',
    },
];
