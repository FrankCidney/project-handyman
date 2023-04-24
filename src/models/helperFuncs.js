// const bcrypt = require('bcrypt');

// phone number validator function
module.exports.validatePhone = value => {
    const phoneRegex = /^\+254\d{9}$/;
    return phoneRegex.test(value);
}
