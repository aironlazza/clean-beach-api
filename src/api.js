const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.status(200).send("<h1>Clean Beach API</h1>");
});
app.get('/query', async(req,res)=>{
    const db = require('./models/db');
    res.status(200).send(await db.select("SELECT name FROM `airline` WHERE country = $1 LIMIT 10", ["United States"]))
});

module.exports = app;