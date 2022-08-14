const Client = require('../models/Client');
const Handyman = require('../models/Handyman');
const jwt = require('jsonwebtoken');

// note to check on preventing null array in db

// create token
const maxAge = 60 * 60 * 3
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'development secret', {
        expiresIn: maxAge
    });
}

// handle errors
const handleErrors = (err) => {
    // errors object to hold errors
    let errors = { username: '', email: '', phoneNo: '', password: '', defaultLocation: '', categories: '' };

    // duplicate unique values
    if (err.code === 11000) {
        Object.keys(err.keyPattern).forEach((key) => {
            errors[key] = `that ${key} already exists`;
        })
        return errors;
    }
    // invalid coordinates, longitude without latitude
    if (err.code === 16755) {
        console.log({ err })
        errors.defaultLocation = 'Invalid coordinates';
    }

    // validation errors
    if (err._message?.includes('validation failed')) {
        Object.values(err.errors).forEach((errorPath) => {
            // handling datatype errors
            if (errorPath.kind === '[Number]') {
                errors.defaultLocation = 'Enter valid coordinates';
            } else if (errorPath.kind === 'Embedded') {
                errors.defaultLocation = 'Expected an object';
            } else {
                errors[errorPath.properties?.path] = errorPath.properties?.message;
            }
        })
    }

    if (err.message === 'Unregistered email') {
        errors.email = err.message;
    }

    if (err.message === 'Incorrect password') {
        errors.password = err.message;
    }
    
    return errors;
}

// route functions
// signup routes
module.exports.signup_client_post = async (req, res) => {
    try {
        const client = await Client.create(req.body);

        const token = createToken(client._id);
        res.cookie('token', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({user: client._id});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}
module.exports.signup_handyman_post = async (req, res) => {
    try {
        const handyman = await Handyman.create(req.body);

        const token = createToken(handyman._id);
        res.cookie('token', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({user: handyman._id});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

// signin routes
module.exports.signin_client_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const client = await Client.login(email, password);

        const token = createToken(client._id);
        res.cookie('token', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({user: client._id});
    } catch (error) {
        const errors = handleErrors(error);
        // console.log({ errors });
        res.status(400).json({ errors });
    }
}
module.exports.signin_handyman_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body);
        const handyman = await Handyman.login(email, password);

        const token = createToken(handyman._id);
        res.cookie('token', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({user: handyman._id});
    } catch (error) {
        // console.log(error);

        const errors = handleErrors(error);
        // console.log({ errors });
        res.status(400).json({ errors });
    }

}