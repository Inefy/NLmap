const { MongoClient } = require('mongodb');

async function main() {
    const url = "mongodb+srv://NLmap:3300project@cluster0.il48a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try {
        await client.connect();

        await updateListingByNameLibrary(client, "Alexander Bay Public Library", {altitudeMode: "clampToBround"});

        await createListingLibrary(client, {
            name: 'Mun Libary',
            description: 'Test',
            altitudeMode : 'clampToGround',
            WKT: 'POINT(0 0)'
        })
    } catch (error) {
        throw(error);
    } finally {
        await client.close();
    }
}


async function updateListingByNameLibrary(client, nameOfListing, updatedListing) {
    const result = await client.db('CultureCenters').collection('Libraries').updateOne({name: nameOfListing}, {$set: updatedListing});
    console.log(`${result.matchedCount} document(s) updated`);
    console.log('${result.modifiedCount} document(s) updated');
}

async function createListingLibrary(client, newListing) {
    const result =  await client.db('CultureCenters').collection('Libraries').insertOne(newListing);
    console.log('New listing created id: ${res.insertedId}');
};
