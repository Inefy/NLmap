const MongoClient = require("mongodb").MongoClient
const url ="mongodb://localhost:27017";
const client = new MongoClient(url);
var populationdb
async function connectPopulationDB(){
    try {
    await client.connect();
    populationdb = await client.db('population');
    console.log('connected to mongodb');
    } catch (error) {
        throw(error);
    }
}
async function getPopulationDB(){
    return populationdb;
}

// testing the function to make sure they throw no errors
connectPopulationDB();
getPopulationDB();