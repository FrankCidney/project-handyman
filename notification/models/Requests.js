const mongoose = require('mongoose');

// location schema: geojson
const geoSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
)

// request schema
const requestSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: [true, 'senderId required']
    },
    receiverId: {
        type: String,
        required: [true, 'receiverId  required']
    },
    description: String,
    senderLocation: geoSchema
});

const Requests = mongoose.model('request', requestSchema);

module.exports = Requests;