const { addUser, removeUser, getUser, handleServiceRes } = require('./helpers');
const Requests = require('./models/Requests');
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
        // const receiver = getUser(receiverId);
        // Notifications.create({ senderId, receiverId, description: requestDesc, type })
        //     .then(notification => {
        //         if (type === 0) {
        //             Client.findById(receiverId)
        //                 .then(client => {
        //                     client.activeService.append({
        //                         handymanId: senderId,
        //                         description: requestDesc
        //                     });

        //                 })
        //             ActiveService.create({ 
        //                 handymanId: senderId,
        //                 clientId: receiverId, 
        //                 description: requestDesc
        //             }).then((activeService => {
        //                 // send request accepted notification to client
        //                 socket.to(receiver?.socketId).emit('getResponseNotification', { 
        //                     senderId,
        //                     type,
        //                     requestDesc,
        //                     notificationId: notification._id,
        //                     activeServiceId: activeService._id
        //                 });
        //             })).catch(error => console.log({ activeServiceCreateError: error }));
        //         } else {
        //             // send request declined notification to client
        //             socket.to(receiver?.socketId).emit('getResponseNotification', { 
        //                 senderId,
        //                 type,
        //                 requestDesc,
        //                 notificationId: notification._id
        //             });
        //         }
                
        //     })
        //     .catch(error => console.log({ notificationCreateError: error }));
    });
}

module.exports = { socketFunc }