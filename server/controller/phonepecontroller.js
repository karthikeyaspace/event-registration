const crypto = require('crypto');
const axios = require('axios');
const { salt_key, merchant_id } = require('../secret/secret.js');


const Payment = async (req, res) => {
    const registeredCollections = req.app.get('registeredCollections')
    try {
        console.log("req.   data ", req.body)
        const merchanttxnid = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchanttxnid,
            merchantUserId: req.body.MUID,
            amount: req.body.amount * 100,
            redirectMode: 'POST',
            redirectUrl: `https://seahorse-app-6ysfg.ondigitalocean.app/register/status/${merchanttxnid}`,
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        }

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyindex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + "###" + keyindex;

        const prod_Url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_Url,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': true,
            },
            data: {
                request: payloadMain
            }
        };

        axios.request(options)
            .then(function (response) {
                console.log(response.data)
                console.log(response.data.data.instrumentResponse.redirectInfo.url)
                return res.send(response.data.data.instrumentResponse.redirectInfo.url)
            })
            .catch(err => console.log(err, "err"));

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Payment.",
            success: false
        })
    }
}

const checkStatus = async (req, res) => {
    console.log("checkkkkkk ", res.req.body)
    const merchantTransactionId = res.req.body.transactionId;
    const merchantId = res.req.body.merchantId;
    const keyindex = 1;
    const registeredCollections = req.app.get('registeredCollections')

    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyindex;

    const options = {
        method: "GET",
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    }

    axios.request(options).then(async function (response) {
        console.log(response)
        if (response.data.code === "PAYMENT_SUCCESS") {
            const url = `${process.env.FRONTEND_URL}register/success`

            let user = {}
            await registeredCollections.findOne({ transactionId: merchantTransactionId })
                .then(dbuser => {
                    user = dbuser
                })
            let stat = "success"
            await registeredCollections.updateOne({ transactionId: merchantTransactionId }, { $set: { status: stat } })
            return res.redirect(url)
        }
        else {
            const url = `${process.env.FRONTEND_URL}register/failure`
            let user = {}
            await registeredCollections.findOne({ transactionId: merchantTransactionId })
                .then(dbuser => {
                    user = dbuser
                })
            let stat = "failure"
            await registeredCollections.updateOne({ transactionId: merchantTransactionId }, { $set: { status: stat } })
            return res.redirect(url)
        }
    })


}

module.exports = { Payment, checkStatus }