

var mongodb = require('mongodb');
const client = require("../databases.js");
client.connectDB();


async function _get_pop_collection (){
    let db = await client.getPopulationDB();
    return await db.collection('population');
};
class TownPop { // town population class that has a name and total population value
    constructor(name,totalpopulation){
        this.name = name;
        this.totalpopulation=totalpopulation;
    }


    async get(name){
        let db = _get_pop_collection; //error on this line
        let town = await db.find({"Geography": name}).toArray(); //probably doing something stupid here, but this is how he has it in the class example (definitely calling on the function wrong)
        return town;
    }

}
let test = new TownPop("Aspen Cove",180);
test.get(test.name); //error cannot read properties of undefined (reading 'find')