const jwt = require('jsonwebtoken');

// jwt secret
// jwt.verify

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.json({ route: '/' });
            } else {
                // console.log(decodedToken);
                req.decodedToken = decodedToken;
                // res.json({ decodedToken });
                next();
            }
        })
    } else {
        res.json({ route: '/'})
    }
}

module.exports = { requireAuth };