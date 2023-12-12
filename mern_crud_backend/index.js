const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Middleware
app.use(cors())
app.use(express.json())

// mongodb
const uri = "mongodb+srv://crudMaster:wu1KZXwLQWzGUNlh@cluster0.clbkfrr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        /* STart */
        const studentCollection = client.db("mern_crudDb").collection("students")

        // Add new student
        app.post("/addstudent", async (req, res) => {
            const newStudent = req.body;
            const result = await studentCollection.insertOne(newStudent)
            res.send(result)
        })

        // Delete Student
        app.delete('/deletestudent/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await studentCollection.deleteOne(query)
            res.send(result)
        })

        // Add new student
        app.get("/allstudent", async (req, res) => {
            const result = await studentCollection.find().toArray();
            res.send(result)
        })
        // Update student
        app.put("/updatestudent/:id", async (req, res) => {
            const id = req.params.id;
            const updatedStudent = req.body;
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedData = {
                $set:{
                    name: updatedStudent.name,
                    id: updatedStudent.id,
                    dept: updatedStudent.dept
                }
            }
            const result = await studentCollection.updateOne(query, updatedData, options)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Default
app.get('/', (req, res) => {
    res.send("Server is running")
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})