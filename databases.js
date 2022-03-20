const MongoClient = require("mongodb").MongoClient
const url ="mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
var populationdb
async function connectDB(){
    try {
    const x = await client.connect();
    populationdb = x.db('population');
    console.log('connected to mongodb');
    } catch (error) {
        throw(error);
    }
}
async function getPopulationDB(){
    return populationdb;
}
connectDB(); //everything here works perfect