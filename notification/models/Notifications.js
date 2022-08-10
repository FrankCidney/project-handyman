const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: [true, 'senderId required']
    },
    receiverId: {
        type: String,
        required: [true, 'receiverId  required']
    },
    description: String,
    type: Number
});

const Notifications = mongoose.model('notification', notificationSchema);

module.exports = Notifications;