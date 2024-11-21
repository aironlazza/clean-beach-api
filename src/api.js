const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.status(200).send("<h1>Clean Beach API</h1>");
});
app.get('/query', async(req,res)=>{
    const db = require('./models/db');
    res.status(200).send(await db.query("SELECT nome, score, moedas FROM `_default` ORDER BY score DESC LIMIT 20"));
    
});
app.post('/insert', async(req,res)=>{
    const db = require('./models/db');
    console.log(req.body);
    db.insert(req.body);
    res.status(200).send("<h1>Clean Beach API</h1>");
});

module.exports = app;