// const bcrypt = require('bcrypt');

// phone number validator function
module.exports.validatePhone = value => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
}
