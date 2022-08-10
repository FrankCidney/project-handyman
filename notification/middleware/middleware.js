const cookie = require('cookie');

const requireSocketAuth = (socket) => {
    let cookies = cookie.parse(socket.handshake.headers.cookie);
    // const token = req.cookies.token;
    // if (token) {
    //     jwt.verify(token, 'secret goes here', (err, decodedToken) => {
    //         if (err) {
    //             res.json({ route: '/' });
    //         } else {
    //             // console.log(decodedToken);
    //             req.decodedToken = decodedToken;
    //             // res.json({ decodedToken });
    //             next();
    //         }
    //     })
    // } else {
    //     res.json({ route: '/'})
    // }
}

module.exports = { requireAuth };