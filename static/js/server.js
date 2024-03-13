const { MongoClient, ServerApiVersion } = require("mongodb");
const credentials = "X509-cert-6502989943461715089.pem";

const client = new MongoClient(
    "mongodb+srv://bracketscluster.tnpze91.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=BracketsCluster",
    {
        tlsCertificateKeyFile: credentials,
        serverApi: ServerApiVersion.v1,
    }
);

const simulateAsyncPause = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
    });

async function run() {
    try {
        await client.connect();
        const database = client.db("TangibleGrid");
        const collection = database.collection("Brackets");
        console.log("Hello");

        const options = { fullDocument: "updateLookup" };
        const pipeline = [{ $match: { status: "Added" } }];
        const changeStream = collection.watch(pipeline, options);
        a = 0;

        changedDocument = "";
        changeStream.set;
        changeStream.on("change", (next) => {
            // Print any change event
            chnagedDocument = next.fullDocument;
            a = 1;
        });

        await simulateAsyncPause();

        console.log(chnagedDocument);

        await changeStream.close();
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
