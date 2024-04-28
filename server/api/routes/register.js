const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");

router.post('/', expressAsyncHandler(async (req, res) => {
    const registeredCollections = req.app.get('registeredCollections')
    const user = req.body;
    const txnid = user.transactionId
    let dbUser = await registeredCollections.findOne({ transactionId: txnid })
    if (dbUser) {
        return res.send({ message: "TxnId already exists" })
    }
    await registeredCollections.insertOne(user)
        .then(() => {
            return res.send({ message: "Instance Created" })
        })
        .catch((err) => {
            return res.send({ message: "Could not create instance" })
        })

}))

router.get('/status', expressAsyncHandler(async (req, res) => {
    const registeredCollections = req.app.get('registeredCollections')
    const type = req.body.type
    const id = req.body.txnid
    let user={}
    if (type === "transactionID") {
         user = await registeredCollections.findOne({ transactionId: id })
    }
    else {
        user = await registeredCollections.findOne({ roll: id })
    }

    if (user === null) {
        return res.send({ message: "User not found" })
    } else {
        return res.send({ message: "User found", user: user })
    }
}
))

module.exports = router;