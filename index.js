const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
// app.get('/users', (req, res) => {

// })

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
        // usersdb + usersColl code here;
        const usersDB = client.db('crudUsers');
        const usersColl = usersDB.collection('peopleInfo');
        // Find mehod code here;
        app.get('/users', async (req, res) => {
            const cursor = usersColl.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        // get dynamic data using id;
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await usersColl.findOne(query)
            res.send(result)
        })
        // All Fetch Mathod here;
        // post
        app.post('/users', async (req, res) => {
            const newData = req.body;
            const result = await usersColl.insertOne(newData)
            console.log(result);
            res.send(result)

        })
        // update user using patch method;
        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('serveer update', id);
            const updatePeopleInfo = req.body;
            console.log(updatePeopleInfo);
            const query = { _id: new ObjectId(id) };
            const update = {
                $set: {
                    name: updatePeopleInfo.name,
                    email: updatePeopleInfo.email
                }
            }
            const result = await usersColl.updateOne(query,update)
            res.send(result)
        })
        // Delete Method;
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('afer delete btn click', id);
            const query = { _id: new ObjectId(id) }
            const result = await usersColl.deleteOne(query)
            res.send(result)
        })





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