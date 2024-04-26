const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(cors({
    origin: "*"
}))
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const phoneperoute = require("./routes/phoneperoute")
app.use("/register", phoneperoute)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})