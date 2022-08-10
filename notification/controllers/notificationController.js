const Handyman =  require('../../src/models/Handyman');
const Requests = require('../models/Requests');
const ActiveService = require('../models/ActiveService');
const { request } = require('express');

// get requests
module.exports.get_requests_get = async (req, res) => {
    const { id } = req.decodedToken;
    const requests = await Requests.find({ receiverId: id });

    if (requests.length === 0) {
        res.json("No requests");
    } else {
        res.status(200).json(requests);
    }
    console.log({fetchedRequests: requests});
    
}

// get active services
module.exports.active_service_get = async (req, res) => {
    const { id } = req.decodedToken;
    const activeServices = await ActiveService.find({ $or: [
        {handymanId: id},
        {clientId: id}
    ] });

    if (activeServices.length === 0) {
        res.json("No active services");
    } else {
        res.status(200).json(activeServices);
    }

    // console.log({fetchedServices: activeServices});
}