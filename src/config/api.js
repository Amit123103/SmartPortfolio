// Automatically switches API URL based on environment
// PROD (GitHub Pages/Render) -> https://smartportfolio-9vov.onrender.com
// DEV (Localhost) -> http://localhost:3000

const API_BASE_URL = import.meta.env.PROD
    ? 'https://smartportfolio-9vov.onrender.com'
    : 'http://localhost:3000';

export default API_BASE_URL;
