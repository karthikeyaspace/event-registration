const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");


router.post('/', expressAsyncHandler(async(req,res)=>{
    if(req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD){
        res.send({message: "Login Success"})
    }else {
        res.send({message: "Login Failed"})
    }
})) 

router.get('/verify',expressAsyncHandler(async(req,res)=>{
    const registeredCollections = req.app.get('registeredCollections')
    const users = await registeredCollections.find().toArray();
    if(users) {
        res.send({message: "All Users", payload: users})
    }
    else {
        res.send({message: "No Users"})
    }
}))

router.put('/verify', expressAsyncHandler(async(req, res)=>{
    const registeredCollections = req.app.get('registeredCollections')
    const user = req.body.user
    await registeredCollections.updateOne({transactionId: user.transactionId}, {$set: {status: user.status}})
    .then(async(user)=>{
        let users = await registeredCollections.find().toArray();
        res.send({message: "User status updated",users :users})
        // if(user.status === "Approved"){
        //     const email = user.email
        //     const subject = "Registration Approved"
        //     const text = "Your registration has been approved. You can now login to the application"
        //     const html = "<p>Your registration has been approved. You can now login to the application</p>"
        //     sendEmail(email, subject, text, html)
        // }
        // if(user.status === "Rejected"){
        //     const email = user.email
        //     const subject = "Registration Rejected"
        //     const text = "Your registration has been rejected. Please contact the admin for more details"
        //     const html = "<p>Your registration has been rejected. Please contact the admin for more details</p>"
        //     sendEmail(email, subject, text, html)
        // }
    }
    ).catch((err)=>{
        res.send({message: "User status updation Failed"})
    })
}))

module.exports = router;

