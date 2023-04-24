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

// job listing schema
const listingSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, 'jobId required']
        },
        clientDetails: {
            id: Number,
            username: String,
            phoneNo: Number,
            defaultLocation: geoSchema
        },
        jobTitle: String,
        jobDescription: String,
        bidCount: Number,
        budget: Number,
        avgBidPrice: Number,
        skills: []
    }
)

const JobListing = mongoose.model('joblisting', listingSchema);

module.exports = JobListing;