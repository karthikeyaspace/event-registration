const crypto = require('crypto');
const axios = require('axios');
const {salt_key, merchant_id} = require('../secret/secret.js');

const Payment = async (req, res) => {
    try{
        console.log("req.   data ",req.body)
        const merchanttxnid = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchanttxnid,
            merchantUserId: req.body.MUID,
            amount: req.body.amount * 100,
            redirectUrl: `https://bug-free-acorn-445994w76pxhq99-5173.app.github.dev/register/status/${merchanttxnid}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument:{
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
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const response = await axios.request(options).then(function(response){
            console.log("ressss0",response.data);
            return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
        })
        .catch(function(error){
            console.error(error);
        });
    } catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Payment.",
            success: false
        })
    }
}   

const checkStatus = async(req, res) => {
    // console.log(res.req.body)
    const merchantTransactionId = res.req.body.transactionId;
    const merchantId = res.req.body.merchantId;
    const keyindex = 1;

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

    axios.request(options).then(async function(response){
        if(response.data.data.status === true){
           const url = `https://bug-free-acorn-445994w76pxhq99-5173.app.github.dev/register/success`
           return res.redirect(url)
        } else {
            const url = `https://bug-free-acorn-445994w76pxhq99-5173.app.github.dev/register/failure`
            return res.redirect(url)
        }
    })


}

module.exports = {Payment, checkStatus}