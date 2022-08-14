const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    clientId: {
        type: String,
        required: [true, 'senderId required']
    },
    handymanId: {
        type: String,
        required: [true, 'receiverId  required']
    },
    merchantRequestId: String,
    checkoutRequestId: String,
    amount: Number
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;