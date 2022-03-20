const { MongoClient } = require('mongodb');

async function main() {
    const url = "mongodb+srv://NLmap:3300project@cluster0.il48a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try {
        await client.connect();

        await updateListingByNameFerries(client, "Argentia", {altitudeMode: "clampToBround"});

        await createListingFerries(client, {
            name: 'St.Johns',
            description: 'testing',
            altitudeMode : 'clampToGround',
            WKT: 'POINT(0 0)'
        })
    } catch (error) {
        throw(error);
    } finally {
        await client.close();
    }
}
async function updateListingByNameFerries(client, nameOfListing, updatedListing) {
    const result = await client.db('CultureCenters').collection('NLmap').updateOne({name: nameOfListing}, {$set: updatedListing});
    console.log(`${result.matchedCount} document(s) updated`);
    console.log('${result.modifiedCount} document(s) updated');
}

async function createListingFerries(client, newListing) {
    const result =  await client.db('CultureCenters').collection('NLmap').insertOne(newListing);
    console.log('New listing created id: ${res.insertedId}');
};
