const mongoose = require('mongoose');

// bid schema
const bidSchema = new mongoose.Schema(
    {
        handymanDetails: {
            id: Number,
            username: String,
            phoneNo: Number,
            rating: { type: Number, default: 0},
            ratingCount: { type: Number, default: 0},
            distance: Number,
            skills: []
        },
        bidDescription: String,
        bidPrice: Number,
        jobId: String
    }
)

const Bid = mongoose.model('bid', bidSchema);

module.exports = Bid;