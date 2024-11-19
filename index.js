const express = require('express');
const app = express();
const crypto = require('crypto');

// Generate code based on date
const generateCode = () => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return crypto.createHash('sha256').update(today).digest('hex').slice(0, 8); // Shorten to 8 chars
};

app.get('/key-link', (req, res) => {
    const referer = req.get('Referer') || '';
    const adlinkDomain = 'https://direct-link.net/1236271/star-x-key1';

    if (!referer.includes(adlinkDomain)) {
        return res.status(403).send('Bypass Detected');
    }

    // If valid referer, return the code
    const code = generateCode();
    res.send({ code });
});

app.listen(3000, () => console.log('App running on port 3000'));
