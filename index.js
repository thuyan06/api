const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.get('/api/temp', (req, res) => {
    const celsius = parseFloat(req.query.celsius);
    if (isNaN(celsius)) {
        return res.status(400).json({ error: 'Invalid Celsius value' });
    }
    const kelvin = celsius + 273.15;
    res.json({ kelvin, celsius });
});



function sieveOfEratosthenes(limit) {
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i * i <= limit; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= limit; j += i) {
                sieve[j] = false;
            }
        }
    }

    return sieve.map((isPrime, index) => isPrime ? index : null).filter(Number);
}




app.get('/api/prime', (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit > 10000) {
        return res.status(400).json({ error: 'Invalid limit or limit exceeds 10,000' });
    }
    const primes = sieveOfEratosthenes(limit);
    res.json({ primes });
});





function fibonacci(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
}

app.get('/api/number', (req, res) => {
    const n = parseInt(req.query.n, 10);
    if (isNaN(n) || n < 0 || n > 50) {
        return res.status(400).json({ error: 'Invalid n. It must be between 0 and 50.' });
    }
    const number = fibonacci(n);
    res.json({ number });
});






app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
