const db = require('./db');

async function pesquisar(campo, valor){
    let result = await db.query("SELECT id FROM `users` WHERE $1 = $2",[campo, valor]);
    console.log(result)
    return result;
}

async function cadastrar(user){
    try{
        let result = await db.query("INSERT INTO `users` VALUES (UUID(), $1)"[user]);
        return result;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {pesquisar, cadastrar};