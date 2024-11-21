const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.status(200).send("<h1>Clean Beach API</h1>");
});
app.get('/query', async(req,res)=>{
    const db = require('./models/db');
    // res.status(200).send(await db.query("SELECT name FROM `airline` WHERE country = $1 LIMIT 10", ["United States"]))
    let user = {
        nome:"airon",
        senha:"123"
    }
    res.status(200).send(await db.query("INSERT INTO `users` VALUES (UUID(), $1)", [user]));
});
app.post('/cadastrar', async(req,res)=>{
    const ctrl = require('./controllers/userController');
    console.log(req.body.user)
    // let resp = await ctrl.cadastrarUsuario(req.body.user);
    // if(resp == 0){
    //     res.status(200).send({msg: "usuário cadastrado com sucesso"});
    // }
    // else if(resp == 1){
    //     res.status(400).send({msg: "usuario existente"});
    // }
    // else{
    //     res.status(400).send({msg: "erro"});
    // }
});

module.exports = app;