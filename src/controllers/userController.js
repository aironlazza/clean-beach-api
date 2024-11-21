const model = require('../models/userModel');

async function cadastrarUsuario(user){
    const USUARIO_EXISTENTE = 1;
    const ERRO = 2;
    if(model.pesquisar('nome', user.nome) !=[]){
        return 1;
    }
    const bcrypt = require('bcryptjs');
    bcrypt.hash(user.senha, 9, async(err, hash)=>{
        if(err){
            return 2;
        }
        user.senha = hash;
        let query = await model.cadastrar(user);
        if(query){
            console.log(query)
            return 0;
        }
        else return 2;
    })
}
module.exports = {cadastrarUsuario}