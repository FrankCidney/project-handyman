const Notifications = require('./models/Notifications');
const ActiveService = require('./models/ActiveService');
const Client = require('../src/models/Client');
const Requests = require('./models/Requests');

let onlineUsers = [];

module.exports.addUser = (userId, socketId) => {
    console.log('new user added')
    console.log(onlineUsers)
    if (!onlineUsers.some(user => userId === user.userId)) {
        onlineUsers.push({userId, socketId});
    }
    console.log(onlineUsers)
}

module.exports.removeUser = socketId => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
    // console.log('user removed: ', socketId)
}

module.exports.getUser = userId => {
    return onlineUsers.find(user => user.userId === userId);
    console.log({onlineUsers});
}

module.exports.handleServiceRes = async (senderId, receiverId, requestDesc, requestId, type, receiverLocation, senderLocation, socket) => {
    console.log('i got to handleServiceRes');
    const receiver = this.getUser(receiverId);
    const notification = await Notifications.create({ senderId, receiverId, description: requestDesc, type })
    if (type === 0) {
        const activeService = await ActiveService.create(
            { 
                handymanId: senderId,
                clientId: receiverId, 
                description: requestDesc,
                clientLocation: receiverLocation,
                handymanLocation: senderLocation
            })

        // send request accepted notification to client
        socket.to(receiver?.socketId).emit('getResponseNotification', 
        { 
            senderId,
            type,
            requestDesc,
            notificationId: notification._id,
            activeServiceId: activeService._id
        });
        console.log('i emitted accepted');
    } else {
        // send request declined notification to client
        socket.to(receiver?.socketId).emit('getResponseNotification', { 
            senderId,
            type,
            requestDesc,
            notificationId: notification._id
        });
        console.log('i emitted declined');
    }

    // delete from requests
    console.log(requestId);
    Requests.findByIdAndDelete(requestId)
    .then(() => console.log('tried to delete'))
    .catch(error => console.log({ deleteError: error }));
}

// Notifications.create({ senderId, receiverId, description: requestDesc, type })
//             .then(notification => {
//                 if (type === 0) {
//                     Client.findById(receiverId)
//                         .then(client => {
//                             client.activeService.append({
//                                 handymanId: senderId,
//                                 description: requestDesc
//                             });
                            
//                         })
//                     ActiveService.create({ 
//                         handymanId: senderId,
//                         clientId: receiverId, 
//                         description: requestDesc
//                     }).then((activeService => {
//                         // send request accepted notification to client
//                         socket.to(receiver?.socketId).emit('getResponseNotification', { 
//                             senderId,
//                             type,
//                             requestDesc,
//                             notificationId: notification._id,
//                             activeServiceId: activeService._id
//                         });
//                     })).catch(error => console.log({ activeServiceCreateError: error }));
//                 } else {
//                     // send request declined notification to client
//                     socket.to(receiver?.socketId).emit('getResponseNotification', { 
//                         senderId,
//                         type,
//                         requestDesc,
//                         notificationId: notification._id
//                     });
//                 }
                
//             })
//             .catch(error => console.log({ notificationCreateError: error }));

// module.exports.handleServiceRes = async (senderId, receiverId, requestDesc, type, socket) => {
//     const receiver = getUser(receiverId);
//     const notifications = await Notifications.create({ senderId, receiverId, description: requestDesc, type })
//     if (type === 0) {
//         const client = await Client.findById(receiverId)
//         client.activeService.append({
//             handymanId: senderId,
//             description: requestDesc
//         });
//         const updatedClient = await Client.save();
//     }
//     socket.to(receiver?.socketId).emit('getResponseNotification', { 
//         senderId,
//         type,
//         requestDesc,
//         notificationId: notification._id
//     });
// }