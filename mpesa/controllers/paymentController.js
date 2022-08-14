const axios = require('axios').default;
const { getUser } = require('../../notification/helpers');
const Payment = require('../models/Payment');
require('dotenv').config();

const date = new Date();
const timestamp = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date.getHours().toString().padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date.getSeconds().toString().padStart(2, "0")}`;

// lipa na mpesa request
module.exports.mpesa_express_request = (req, res) => {
    const shortCode = 174379;
    // get request data
    const { handymanId, amount, phoneNo } = req.body;
    // get clientId
    const { id } = req.decodedToken;
    // receiverIdVar = id;

    // encode password
    const pswrd = shortCode+process.env.MPESA_EXPRESS_PASSKEY+timestamp;
    let buf = Buffer.from(`${pswrd}`);
    const password = buf.toString('base64');

    // define body
    const body = {
        "BusinessShortCode": shortCode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNo,
        "PartyB": shortCode,
        "PhoneNumber": phoneNo,
        "CallBackURL": `${process.env.SERVER_URL}/mpesa/stk-result`,
        "AccountReference": "Handy",
        "TransactionDesc": "Payment of handyman"
    }
    // Payment of X
    // CompanyXLTD
    // 254708374149

    // get access token
    const accessToken = req.accessToken;

    // set up request headers
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }

    // console.log('here here');
    // make payment request to daraja api
    axios.post(process.env.DARAJA_API_STK_ENDPOINT, body, config)
        .then(({ status, statusText, data }) => {
            console.log({ stkResponse: {
                status,
                statusText,
                data
            }});
            if (data.ResponseCode === '0') {
                Payment.create({ 
                    clientId: id, 
                    handymanId, 
                    merchantRequestId: data.MerchantRequestID,
                    checkoutRequestId: data.CheckoutRequestID,
                    amount
                });
                res.status(200).json({code: 0, msg: 'request accepted'});
            }
            if (status === 400) {
                res.status(400).json({code: 1, msg: 'error making payment'});
            }
        })
        .catch(error => {
            console.log({ thisPayError: error.response });
            res.status(400).json({code: 1, msg: 'error making payment'});
        });
 }

// lipa na mpesa result after stk push
module.exports.stk_result = async (req, res) => {
    // console.log('I got here');
    const io = req.io;
    const { ResultCode, ResultDesc, MerchantRequestID } = req.body.Body.stkCallback;

    if (ResultCode !== 0) {
        
        if (ResultCode === 1032) {
            const payment = await Payment.find({ merchantRequestID: MerchantRequestID })
            console.log({payment})
            const receiver = getUser(payment.clientId);
            // io.to(receiver?.socketId).emit('paymentResponse', { code: 1032, msg: 'User cancelled the request' });
            io.emit('paymentResponse', { code: 1032, msg: 'User cancelled the request' });
            console.log({ResultCode, ResultDesc});

            // trigger soket emit
            // receiverId = receiverIdVar;
            // paymentPayload = 1032;
        }
        
        if (ResultCode === 1037) {
            const payment = await Payment.find({ merchantRequestID: MerchantRequestID })
            const receiver = getUser(payment.clientId);
            console.log('User cannot be reached');
            // io.to(receiver?.socketId).emit('paymentResponse', { code: 1037, msg: 'User cannot be reached' });
            io.emit('paymentResponse', { code: 1037, msg: 'User cannot be reached' });
        }
    } else {
        const payment = await Payment.find({ MerchantRequestID })
        const receiver = getUser(payment.clientId);
        // io.to(receiver?.socketId).emit('paymentResponse', { code: 0, msg: 'Payment was successful' });
        io.emit('paymentResponse', { code: 0, msg: 'Payment was successful' });

        // trigger socket emit
        // receiverId = receiverIdVar;
        // paymentPayload = 0;

        // console.log({ResultDesc});
    }
    console.log({ stkPushResult: req.body.Body.stkCallback})
}

// b2c request
module.exports.b2c_request = (req, res) => {
    console.log('in request');
    // define body
    const body = {
        "InitiatorName": "testapi",
        "SecurityCredential": process.env.B2C_SECURITY_CREDENTIAL,
        "CommandID": "BusinessPayment",
        "Amount": 1,
        "PartyA": 600997,
        "PartyB": 254708374149,
        "Remarks": "Test remarks",
        "QueueTimeOutURL": `${process.env.SERVER_URL}/mpesa/b2c/timeout`,
        "ResultURL": `${process.env.SERVER_URL}/mpesa/b2c/result`,
        "Occassion": "Deposit to handyman",
    }
    // 254708374149

    // get access token
    const accessToken = req.accessToken;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }

    // make b2c payment request to daraja api
    axios.post(process.env.DARAJA_API_B2C_ENDPOINT, body, config)
        .then(response => console.log({ b2cResponse: response }))
        .catch(error => console.log(error));
}

// b2c timeout url
module.exports.b2c_timeout = (req, res) => {
    console.log({ b2cTimeout: req.body });
}

// b2c result
module.exports.b2c_result = (req, res) => {
    console.log({ b2cResult: req.body.Result.ReferenceData });
}




