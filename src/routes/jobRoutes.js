const { Router } = require('express');
const jobController = require('../controllers/jobController');

const router = Router();

router.post('/new-listing', jobController.newlisting_post);
router.post('/bid', jobController.bid_post);
router.get('/handyman/job-listings', jobController.listing_get);
router.get('/bid/:jobId', jobController.job_details_get);
router.get('/client/job-listings/:numId', jobController.client_listing_get);
router.get('/client/get-bids/:jobId', jobController.bids_get);

module.exports = router;