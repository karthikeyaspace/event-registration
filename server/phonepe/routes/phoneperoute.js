const { Payment, checkStatus } = require('../controller/phonepecontroller');
const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{
    const registeredCollections = req.app.get('registeredCollections')
    const user = req.body;
    try{
        await registeredCollections.insertOne(user)
        res.send({message: "Instance Created"})
    }catch(err){
        res.send({
            message: err.message || "Some error occurred while creating the Payment.",
            success: false
        })
    }
})    
router.post('/payment', Payment);
router.post('/status/:txnid', checkStatus);

module.exports = router;