const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000
// MiddleWare
app.use(cors())
app.use(express.json())
// mongoDB uri
const uri = "mongodb+srv://crudUsers:SrMxSjLmw2Lqz0Qd@cluster0.fdzc9ua.mongodb.net/?appName=Cluster0";
// Root Api
app.get('/', (req, res) => {
    res.send('first-crud-operation-server here')
})
// users Api
app.get('/users', (req, res) => {
    res.send('first-crud-operation-server here')
})
// post
app.post('/users', (req, res) => {
    const newData = req.body;
    console.log(newData);
    res.send(newData)
})
// create mongodb client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// async funk
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);
// listinner
app.listen(port, () => {
    console.log(`This server running is port ${port}`);
})

/** crudUsers
 * SrMxSjLmw2Lqz0Qd
 * SrMxSjLmw2Lqz0Qd
 */