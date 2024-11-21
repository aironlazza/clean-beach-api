var couchbase = require('couchbase');

async function connect(){
    let cluster = await couchbase.connect(process.env.DB_CONNECTION_STRING,{
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    });
    const bucket = cluster.bucket("travel-sample");
    const scope = bucket.scope('teste');
    return scope;
    //teste
};

async function query(query,params){
    const db = await connect();
    let queryResult = await db.query(query, {parameters: params});
    return queryResult.rows;
}
module.exports = {query};