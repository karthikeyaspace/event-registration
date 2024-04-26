const express = require("express")
const mongoClient = require("mongodb").MongoClient;
const app = express()
const port = 3000
const cors = require("cors")
require('dotenv').config()


mongoClient.connect(process.env.MONGO_URL).then((client) => {

    const db = client.db("technovista");
    const registeredCollections = db.collection("registeredUsers");
    app.set("registeredCollections", registeredCollections);
    console.log("DB conncetion established");
  })
  .catch((err)=>{
      console.log('Error connecting DB ', err);
  });
  
app.use(express.json())

app.use(cors({
    origin: "https://technovista-registrations.vercel.app",
    methods: ['GET', 'POST', 'PUT']
}))

const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const phoneperoute = require("./routes/phoneperoute")
app.use("/register", phoneperoute)

app.listen(process.env.PORT||3000, () => {
    console.log("Server is running on port 3000")
})