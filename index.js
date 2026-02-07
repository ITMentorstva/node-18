
const express = require('express');
const app = express();
require('dotenv').config(); // ucitati .env

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world!");
});


app.listen(process.env.APP_PORT, () => {
    console.log("Server running on http://localhost:3000");
});

