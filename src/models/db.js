var couchbase = require('couchbase');

async function connect(){
    let cluster = await couchbase.connect(process.env.DB_CONNECTION_STRING,{
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    });
    const scope = cluster.bucket("clean-beach").scope('_default');
    const col = scope.collection("_default");
    return {cluster, scope, col};
    //teste
};

async function query(string, params){
    try{
        const db = await connect();
        let result = await db.scope.query(string,{parameters: params});
        console.log(result);
        return result.rows;
    }
    catch(error){
        console.log(error)
        return false;
    }
}

async function insert(dados){
    try{
        const db = await connect();
        await db.cluster.transactions().run(async(ctx) =>{
            let get = await db.scope.query("SELECT numID FROM `_default` ORDER BY numID DESC LIMIT 1");
            let id = get.rows[0].numID + 1;
            dados = {
                numID: id,
                nome: dados.nome,
                score: dados.score,
                moedas: dados.moedas
            }
            console.log(dados)
            let resp = await ctx.insert(db.col,`${id}`, dados)
            
        });
        return true;
    }
    catch(error){
        console.log(error)
        return false;
    }
}
module.exports = {insert,query};