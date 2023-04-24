const JobListing = require('../models/JobListing');
const Handyman = require('../models/Handyman');
const Bid = require('../models/Bid');
const { searchBySimOnly, distance, deg2rad } = require('../helperFuncs');

module.exports.newlisting_post = async (req, res) => {
    try {
        const lastRecord = await JobListing.findOne().sort({_id: -1}).limit(1)
        console.log({lastRecord})
        let newRecord = {};

        if (!lastRecord) {
            newRecord = { ...req.body, id: 1 }
        } else {
            newRecord = { ...req.body, id: lastRecord.id + 1 }
        }
        
        // , budget: parseInt(req.body.budget)

        const jobListing = await JobListing.create(newRecord);
        res.status(200).json({ code: "0" });
    } catch (error) {
        // console.log(error)
        res.status(400).json({ code: "1", msg: error });
    }
}

module.exports.listing_get = async (req, res) => {
    const { id } = req.decodedToken;
    // let jobsToSend = [];
    // const {_id } = req.body;
    // const jobListing = await JobListing.findOne({ _id: _id });
    try {
        const handyman = await Handyman.findById(id);
        const corpus =  `${handyman.skills.join(' ')} ${handyman.description}`
        
        searchBySimOnly(corpus, './python_files/recommendJobs.py')
            .then(relevantJobs => {
                // console.log(relevantJobs);
                // jobsToSend = relevantJobs.map(job => JobListing.findOne({ id: job.id }))

                const jobIds = relevantJobs.map(job => job.id);

                JobListing.find({ id: { $in: jobIds } })
                .then((jobsWithDetails) => {
                    // console.log(jobsWithDetails);
                    if (jobsWithDetails.length === 0) {
                        console.log('sending none')
                        res.status(200).json('none');
                    } else {
                        console.log('sending jobs')
                        res.status(200).json(jobsWithDetails);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
                
            })
            .catch(error => console.log(error));

    } catch (error) {
        res.status(400).json({ code: "1", msg: error });
    }
}

module.exports.job_details_get = async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const job = await JobListing.findById(jobId)
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ code: "1", msg: error });
    }
}

module.exports.client_listing_get = async (req, res) => {
    const id = req.params.numId;

    try {
        const clientJobs = await JobListing.find({'clientDetails.id': id})
        if (clientJobs.length === 0) {
            res.status(200).json('none');
        } else {
            res.status(200).json(clientJobs);
        }
        
    } catch (error) {
        res.status(400).json({ code: "1", msg: error });
    }
}

module.exports.bid_post = async (req, res) => {
    try {

        const { userId, bidPrice, bidDesc, jobId } = req.body;

        // get job that was bid for
        const job = await JobListing.findById(jobId);

        // get details of handyman who posted the bid
        const handyman = await Handyman.findById(userId);

        // get client and handyman coords
        clientLat = job.clientDetails.defaultLocation.coordinates[1];
        clientLong = job.clientDetails.defaultLocation.coordinates[0];
        handymanLat = handyman.defaultLocation.coordinates[1];
        handymanLong = handyman.defaultLocation.coordinates[0];

        // find distance btwn handyman and client who posted the job (in metres)
        const dist = distance(clientLat, clientLong, handymanLat, handymanLong);

        // create bid object to save
        const bidDoc = {
            handymanDetails: {
                id: handyman.id,
                username: handyman.username,
                phoneNo: handyman.phoneNo,
                rating: handyman.rating.value,
                ratingCount: handyman.rating.count,
                distance: dist,
                skills: handyman.skills
            },
            bidDescription: bidDesc,
            bidPrice: bidPrice,
            jobId: jobId
        }

        // create the new bid document
        const bid = await Bid.create(bidDoc);
    
        // update bidCount and avgBidPrice
        let bidPriceTotal = job.avgBidPrice * job.bidCount;
        job.bidCount += 1;
        job.avgBidPrice = (bidPriceTotal + bid.bidPrice) / job.bidCount;
    
        // save new bidCount and avgBidPrice
        const updatedJobListing = await job.save();
        res.status(200).json({ code: "0" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ code: "1", msg: error });
    }
}

module.exports.bids_get = async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const bids = await Bid.find({ jobId })
        res.status(200).json(bids);
    } catch (error) {
        res.status(400).json({ code: "1", msg: error });
    }
}