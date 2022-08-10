const mongoose = require('mongoose');
const { validatePhone } = require('./helperFuncs');
const bcrypt = require('bcrypt');

// location schema: geojson
const geoSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
            required: [true, 'Please enter coordinates']
        }
    }
)

// handyman schema
const handymanSchema = mongoose.Schema(
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
            lowercase: true
        },
        phoneNo: {
            type: String,
            required: [true, 'phone number required'],
            validate: [value => validatePhone(value), 'Enter a valid phone number']
        },
        password: {
            type: String,
            required: [true, 'password required'],
            minlength: [7, 'minimum password length is 7 characters']
        },
        defaultLocation: geoSchema,
        categories: {
            type: [{}],
            required: [true, 'category required']
        },
        rating: {
            ratingValue: { type: Number, default: 0},
            ratingCount: { type: Number, default: 0}
        }
    }
)

handymanSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})

handymanSchema.statics.login = async function (email, password) {
    const handyman = await this.findOne({ email });
    if (handyman) {
        const auth = await bcrypt.compare(password, handyman.password);
        if (auth) {
            return handyman;
        }
        throw Error('Incorrect password');
    }
    throw Error('Unregistered email');
}

const Handyman = mongoose.model('handyman', handymanSchema, 'handymen');

module.exports = Handyman;