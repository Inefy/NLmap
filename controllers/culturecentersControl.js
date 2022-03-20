const { MongoClient } = require('mongodb');

async function main() {
    const url = "mongodb+srv://NLmap:3300project@cluster0.il48a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try {
        await client.connect();

        await updateListingByNameCulture(client, "Gordon Pinsent Centre for the Arts", {altitudeMode: "clampToBround"});

        await createListingCulture(client, {
            name: 'Geocenter',
            description: 'Here is the geo center',
            altitudeMode : 'clampToGround',
            WKT: 'POINT(0 0)'
        })
    } catch (error) {
        throw(error);
    } finally {
        await client.close();
    }
}


async function updateListingByNameCulture(client, nameOfListing, updatedListing) {
    const result = await client.db('CultureCenters').collection('NLmap').updateOne({name: nameOfListing}, {$set: updatedListing});
    console.log(`${result.matchedCount} document(s) updated`);
    console.log('${result.modifiedCount} document(s) updated');
}


async function createListingCulture(client, newListing) {
    const result =  await client.db('CultureCenters').collection('NLmap').insertOne(newListing);
    console.log('New listing created id: ${res.insertedId}');
};
