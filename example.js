const axios = require('axios');
const fs = require('fs');

async function generatePdfFromUrl(targetUrl, rapidapiKey) {
    // Get your FREE API key here: https://rapidapi.com/titavares33/api/urltopdf-invoices-reports
    const apiUrl = 'https://urltopdf-invoices-reports.p.rapidapi.com/api/v1/pdf';

    const options = {
        method: 'POST',
        url: apiUrl,
        headers: {
            'x-rapidapi-host': 'urltopdf-invoices-reports.p.rapidapi.com',
            'x-rapidapi-key': rapidapiKey,
            'Content-Type': 'application/json'
        },
        data: { url: targetUrl },
        responseType: 'arraybuffer' // Crucial for receiving binary PDF files
    };

    try {
        console.log(`Generating PDF for ${targetUrl}...`);
        const response = await axios.request(options);
        
        fs.writeFileSync('output.pdf', response.data);
        console.log('Success! PDF saved as output.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error.response ? error.response.data : error.message);
    }
}

// --- Usage Example ---
const API_KEY = 'YOUR_RAPIDAPI_KEY'; // Replace with your key
const TARGET_URL = 'https://en.wikipedia.org/wiki/Invoice';

generatePdfFromUrl(TARGET_URL, API_KEY);
