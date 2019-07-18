function home() {
    return "Hello World haha!"
}

function mongo() { 
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://localhost:27017';

    async function findOne() {
        const client = await MongoClient.connect(url)
            .catch(err => { console.log(err); });
    
        if (!client) {
            return;
        }
    
        try {
            const mydb = client.db("test");
            let collection = mydb.collection('xxx');

            let time = new Date().getTime();
            let mydoc = { name: "jack", age: 22 };
            mydoc.time = time;
            await collection.insertOne(mydoc);

            let query = {};
            query.time = time;
            let result = await collection.findOne(query);
            return result;   
        } catch (err) {
            console.log(err);
        } finally {   
            client.close();
        }
    }
    return findOne();
}

function mysql() {
    return "todo: mysql"
}

function redis() {
    return "todo: redis"
}

exports.home = home;
exports.mongo = mongo;
exports.mysql = mysql;
exports.redis = redis;