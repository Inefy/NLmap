const { MongoClient } = require('mongodb');

async function main() {
    const url = "mongodb+srv://NLmap:3300project@cluster0.il48a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try {
        await client.connect();
        await findOnelistingByNameLibraries(client, "A.C. Hunter Public Library");
    } catch (error) {
        throw(error);
    } finally {
        await client.close();
    }}
        main().catch(console.error);
        async function findOnelistingByNameLibraries(client, name) {
            const result = await client.db('CultureCenters').collection('Libraries').findOne({name: name});
            if (result) {
                console.log(result);
            } else {
                console.log('No result found');
            } }