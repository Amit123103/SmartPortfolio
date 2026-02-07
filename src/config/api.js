// Automatically switches API URL based on environment
// PROD (GitHub Pages/Render) -> https://smartportfolio-9vov.onrender.com
// DEV (Localhost) -> http://localhost:3000

const API_BASE_URL = import.meta.env.PROD
    ? 'https://smartportfolio-1n1t.onrender.com'
    : ''; // Empty string lets Vite proxy handle it locally

export default API_BASE_URL;
