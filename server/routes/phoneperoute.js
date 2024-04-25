const { Payment, checkStatus } = require('../controller/phonepecontroller');
const express = require('express');
const router = express.Router();

router.post('/payment', Payment);
router.post('/status/:txnid', checkStatus);

module.exports = router;