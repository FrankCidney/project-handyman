const Client = require('../models/Client');
const Handyman = require('../models/Handyman');

module.exports.default_location_get = async (req, res) => {
    let location = {lng: 0, lat: 0}
    const { id } = req.decodedToken;
    const client = await Client.findOne({ _id: id });
    if (!client?.defaultLocation?.coordinates) {
        res.status(200).json({noDefaultLocation: "You have not set a default location"})
    } else {
        // console.log(client);
        const coords = client.defaultLocation.coordinates;
        location.lng = coords[0];
        location.lat = coords[1];

        res.status(200).json(location);
    }
}

module.exports.rating_put = async (req, res) => {
    const { handymanId, ratingVal } = req.body;
    console.log('i got here');
    console.log({ ratingVal });

    try {
    const handyman = await Handyman.findOne({ _id: handymanId });
    
    // update rating value
    let ratingTotal = handyman.rating.ratingValue * handyman.rating.ratingCount;
    console.log(handyman.rating);
    handyman.rating.ratingCount += 1;
    handyman.rating.ratingValue = (ratingTotal + ratingVal) / handyman.rating.ratingCount;

    console.log(handyman.rating);
    // save new rating value
        const updatedHandyman = await handyman.save();
        res.status(200).json({
            handymanId: updatedHandyman._id, 
            msg: 'sucessfully rated'
        });
    } catch (error) {
        console.log({ error });
        res.status(400).json('Could not perform rating');
    }
}
// get client details
module.exports.details_client_get = async (req, res) => {
    const clientId = req.params.clientId;

    try {
    const client = await Client.findById(clientId);
    res.status(200).json({ clientName: client.username, clientPhone: client.phoneNo});

    } catch (error) {
        console.log({ errorClientDetailsFetch: error });
        // res.status(400).json('');
    }
}
// get handyman details
module.exports.details_handyman_get = async (req, res) => {
    const handymanId = req.params.handymanId;

    try {
        const handyman = await Handyman.findById(handymanId);
        const coords = handyman.defaultLocation.coordinates;
        // location.lng = coords[0];
        // location.lat = coords[1];
        // console.log('i am here');
        res.status(200).json({ handymanName: handyman.username, coords, handymanNo: handyman.phoneNo });

    } catch (error) {
        console.log({ errorHandymanDetailsFetch: error });
    }
}