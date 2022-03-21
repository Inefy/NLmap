

const { MongoClient } = require('mongodb');
async function main(){
    const url = "mongodb+srv://NLmap:3300project@cluster0.il48a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        await queryPop(client); //query the collection to only use relevant data 
        await get(client,'Aspen Cove');
        let newTown = new TownPop('Aspen Cove',180);
        await update(client,'noob',newTown);
    } catch (error) {
        throw(error);
    } finally {
        await client.close();
    }

    }

class TownPop { // town population class that has a name and total population value
    constructor(name,totalpopulation){
        this.name = name;
        this.totalpopulation=totalpopulation;
    }
}

async function get(client,name){
    const result = await client.db('TownPopulation').collection('population').findOne({'Geography':name}); // retrieve the data point with the corresponding name
    if(result){ //if there is a result, print it
        console.log(result);
    }
    else{
        console.log('No result found');
    }
}


async function update(client,name,new_Town){ //updates a data point with a given name and population value
    let new_values = {$set: {'Geography': new_Town.name, 'Total Population': new_Town.totalpopulation}};
    let obj = await client.db('TownPopulation').collection('population').updateOne({'Geography': name}, new_values);
    if (obj.modifiedCount > 0){
        return 'Contact correctly updated.';
    }
    else{
        return 'Contact was not updated';
    
    }
}

async function deleteTown(client,name){ //deletes a town from the collection
    let obj = await client.db('TownPopulation').collection('population').deleteOne({'Geography':name});
}

async function queryPop(client){ //removes all outdated data
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2010'});
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2011'});
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2012'});
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2013'});
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2014'});
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2015'});
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2016'});
    await client.db('TownPopulation').collection('population').deleteMany({'year':'2017'});
    await client.db('TownPopulation').collection('population').deleteMany({'Gender':'Male'}); //population values were split in total, male, and female. we can remove the population of males and females. 
    await client.db('TownPopulation').collection('population').deleteMany({'Gender':'Female'});
}

main();
