const axios = require('axios').default;
require('dotenv').config();

const getAccessToken = (req, res, next) => {
    // let buf = Buffer.from(`${process.env.DARAJA_API_KEY}:${process.env.DARAJA_API_SECRET}`);
    // const auth = buf.toString('base64');
    axios.get(process.env.DARAJA_API_AUTH_ENDPOINT, {
        headers: {
            Authorization: `Basic ${process.env.DARAJA_API_AUTHORIZATION}`
        }
    })
    .then(res => res.data)
    .then(data => {
        console.log(data);
        req.accessToken = data.access_token;
        next();
    })
    .catch(error => console.log({ accessTokenError: error.response }));
}

module.exports = { getAccessToken };