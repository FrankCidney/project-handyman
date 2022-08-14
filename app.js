const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const { requireAuth } = require('./src/middleware/authMiddleware');
const Handyman = require('./src/models/Handyman');
const userDetailsRoutes = require('./src/routes/userDetailsRoutes');
const paymentRoutes = require('./mpesa/routes/paymentRoutes');
const { socketFunc } = require('./notification/socketFunc');
const { removeUser } = require('./notification/helpers');
const notificationRoutes = require('./notification/routes/notificationRoutes');
const path = require('path');
// const { requireSocketAuth } = require('./notification/middleware/middleware');
// const axios = require('axios').default;
// const { getAccessToken } = require('./mpesa/middleware/middleware');

const frontEndUrl = process.env.FRONT_END_URL;
// setting up server
const app = express();
const httpServer = http.createServer(app);
// const io = new Server(httpServer);
const io = new Server(httpServer, {cors: frontEndUrl, credentials: true});

// middleware
app.use(express.json());
app.use(cors({ origin: frontEndUrl, credentials: true }));
app.use(cookieParser());

// socket middleware
// io.use((socket, next) => {
//     // verify auth token
//     requireSocketAuth(socket);
//     next()
// })
const setIo = (req, res, next) => {
    req.io = io;
    next();
}

// socket connection
io.on('connection', (socket) => {
    // socket functions
    socketFunc(socket);

    // fires on disconnect
    socket.on('disconnect', () => {
        console.log('user removed');
        removeUser(socket.id);
    })
})

// database connection
const port = process.env.PORT || 3001;
const dbURI=process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => httpServer.listen(port, () => console.log(`listening on port ${port}`)))
    .catch((err) => console.log(err));

// routes
// user routes
app.use('/user', authRoutes);
app.use('/user', requireAuth, userDetailsRoutes);
app.get('/search/:categoryId', requireAuth, (req, res) => {
    Handyman.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: 'dist.calculated',
                maxDistance: 5000,
                spherical: true
            }
        }
    ]) 
        .then((result) => { 
            if (result.length === 0) {
                res.json("No nearby handymen");
            } else {
                const filteredbyCategory = result.filter(handyman => {
                    const isInCategory = handyman.categories.find(category => category.id === req.params.categoryId);
                    return isInCategory;
                });
                if (filteredbyCategory.length === 0) {
                    res.json("No nearby handymen");
                } else {
                    // make sure to send what is required
                    
                    res.status(200).json(filteredbyCategory);
                }
            }
        })
        .catch((error) => console.log(error));
})

// mpesa routes
app.use('/mpesa', setIo, paymentRoutes);

// notification routes
app.use('/notifications', requireAuth, notificationRoutes);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// app.get('/testroute', (req, res) => res.send('test route worked'));
