const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const { validatePhone } = require('./helperFuncs');

// location schema: geojson
const geoSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
)

// client schema
const clientSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'username required'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'email required'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'enter a valid email']
        },
        phoneNo: {
            type: String,
            required: [true, 'phone number required'],
            validate: [value => validatePhone(value), 'Enter a valid phone number']
        },
        defaultLocation: geoSchema,
        password: {
            type: String,
            required: [true, 'password required'],
            minlength: [7, 'minimum password length is 7 characters']
        },
        activeService: [{}]
    }
)

clientSchema.pre('save', async function (next) {
    // this.password = hashPassword(this.password);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

clientSchema.statics.login = async function (email, password) {
    const client = await this.findOne({ email });
    if (client) {
        const auth = await bcrypt.compare(password, client.password);
        if (auth) {
            return client;
        }
        throw Error('Incorrect password');
    }
    throw Error('Unregistered email');
}

const Client = mongoose.model('client', clientSchema);

module.exports = Client;