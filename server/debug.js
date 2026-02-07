console.log('Starting debug...');
try {
    console.log('Importing dotenv...');
    await import('dotenv');
    console.log('Importing express...');
    await import('express');
    console.log('Importing cors...');
    await import('cors');
    console.log('Importing nodemailer...');
    await import('nodemailer');
    console.log('Importing openai...');
    await import('openai');
    console.log('Importing db...');
    await import('./db/db.js');
    console.log('Importing services/email...');
    await import('./services/email.js');
    console.log('Importing services/ai...');
    await import('./services/ai.js');
    console.log('Importing routes/contact...');
    await import('./routes/contact.js');

    console.log('ALL IMPORTS PASSED');
} catch (e) {
    console.error('DEBUG FAILURE:', e);
}
