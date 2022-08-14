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

// active service schema
const activeServiceSchema = mongoose.Schema({
    handymanId: {
        type: String,
        required: [true, 'handymanId required']
    },
    clientId: {
        type: String,
        required: [true, 'clientId  required']
    },
    description: String,
    clientLocation: geoSchema,
    handymanLocation: geoSchema
});

const ActiveService = mongoose.model('active-service', activeServiceSchema);

module.exports = ActiveService;