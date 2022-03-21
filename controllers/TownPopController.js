const MongoClient = require("mongodb").MongoClient
async function main(){
    const url = "mongodb+srv://NLmap:3300project@cluster0.il48a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(url); //Establish a connection to with mongodb
    try {
        await client.connect();
        await createTown(client,{ //create a town to add to the collection
            Geography: 'Test Town',
            year: '2018',
            Gender: 'Total',
            'Total Population': 124  
        })
    } catch (error) {
        throw(error);
    } finally {
        await client.close(); //close connection
    }
}
async function createTown(client, newTown){ //adds inputted town into the population collection
    const result = await client.db('TownPopulation').collection("population").insertOne(newTown);
    let x =await client.db('TownPopulation').collection("population").findOne({'Geography':'Test Town'});
    console.log(x);
}
main();
