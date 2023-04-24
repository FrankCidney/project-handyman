const { addUser, removeUser, getUser, handleServiceRes } = require('./helpers');
const Requests = require('./models/Requests');
const Handyman = require('../src/models/Handyman');
const ActiveService = require('../notification/models/ActiveService');
// const Notifications = require('./models/Notifications');
// const ActiveService = require('./models/ActiveService');
// const Client = require('../src/models/Client');
// const { paymentSuccess } = require('../mpesa/controllers/paymentController');

// const paymentSuccessful = (socket, receiverId) => {
//     socket.to(receiver?.socketId).emit('paymentSuccessful');
// }

const socketFunc = (socket) => {
    console.log('someone has connected from socket func: ', socket.id);

    // add new user to array when they connect
    socket.on('newUser', userId => addUser(userId, socket.id));

    // handle service requests
    socket.on('sendServiceRequest', ({ senderId, receiverId, description, senderLocation }) => {
        let location = {lng: 0, lat: 0}
        console.log('i am here')

        location.lng = senderLocation.coordinates[0];
        location.lat = senderLocation.coordinates[1];

        const receiver = getUser(receiverId);
        Requests.create({ senderId, receiverId, description, senderLocation })
            .then(request => {
                // send service request to handyman
                socket.to(receiver?.socketId).emit('getServiceRequest', { 
                    senderId, 
                    description,
                    senderLocation: location, 
                    requestId: request._id 
                });
            })
            .catch(error => console.log({requestCreateError: error}));
    });
    socket.on('sendResponseNotification', ({ senderId, receiverId, requestDesc, requestId, type, receiverLocation, senderLocation }) => {
        handleServiceRes(senderId, receiverId, requestDesc, requestId, type, receiverLocation, senderLocation, socket);
    });

    // handle bid accept
    socket.on('sendBidAccept', data => {
        Handyman.findOne({ id: data.handymanNumId })
            .then(handyman => {
                ActiveService.create(
                    { 
                        handymanId: handyman._id,
                        clientId: data.clientId, 
                        description: data.bidDesc,
                        clientLocation: data.clientLocation,
                        handymanLocation: handyman.defaultLocation
                    }).then(activeServ => console.log(activeServ))
                    .catch(error => console.log({ activeServErrBid: error}))
            })
            .catch(error => console.log({handymanNumErr: error}))

    })
}

module.exports = { socketFunc }