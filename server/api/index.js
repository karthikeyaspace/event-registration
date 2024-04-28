const express = require("express")
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
require('dotenv').config()

app.use(express.json())
app.use(cors())



mongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
        const db = client.db("technovista");
        const registeredCollections = db.collection("registeredUsers");
        app.set("registeredCollections", registeredCollections);
        console.log("DB conncetion established");
    })
    .catch((err) => {
        console.log('Error connecting DB ', err);
    })


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const phoneperoute = require("./routes/phoneperoute")
// app.use("/register", phoneperoute)

const admin = require("./routes/admin.js")
app.use("/admin", admin)

const register = require("./routes/register.js")
app.use('/register', register)

app.use((err, req, res, next) => {
    res.send({ message: err.message })
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running on port ", process.env.PORT || 3001)
})