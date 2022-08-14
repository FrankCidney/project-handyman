const Handyman =  require('../../src/models/Handyman');
const Requests = require('../models/Requests');
const ActiveService = require('../models/ActiveService');
const Notifications = require('../models/Notifications');
// const { request } = require('express');

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
        res.status(200).json("No active services");
    } else {
        res.status(200).json(activeServices);
    }

    // console.log({fetchedServices: activeServices});
}

// get notifications
module.exports.get_notifications_get = async (req, res) => {
    const { id } = req.decodedToken;
    try {
        const notifications = await Notifications.find({
            $or: [
                {senderId: id},
                {receiverId: id}
            ]
        });
        console.log({ notifications });
        res.status(200).json(notifications);
    } catch (error) {
        console.log({ getNotificationsError: error });
    }
}

// delete notifications when marked as read
module.exports.mark_as_read_delete = async (req, res) => {
    const { id } = req.decodedToken;
    try {
        await Notifications.deleteMany({ receiverId: id });
        res.status(200).json('deleted');
    } catch (error) {
        console.log({ deleteNotificationsError: error });
    }
    
}

// delete active service 
module.exports.end_active_service_delete = async (req, res) => {
    const { activeServiceId } = req.params;
    try {
        await ActiveService.findByIdAndDelete(activeServiceId);
        res.status(200).json('deleted');
    } catch (error) {
        console.log({ deleteActiveServiceError: error });
    }
}