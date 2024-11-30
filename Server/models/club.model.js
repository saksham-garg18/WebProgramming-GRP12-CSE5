const mongoose = require('mongoose');
const { isURL, isEmail } = require('validator');

const clubSchema = new mongoose.Schema({
    uid: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    motto: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        default: 'https://res.cloudinary.com/deuv3jnzu/image/upload/v1728713962/nexus_logo_u4nuqu.png',
    },
    about: {
        type: String,
        required: true,
    },
    whyus: {
        type: String,
        required: true,
    },
    president_email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^.+@(bmu|bml)\.edu\.in$/.test(value),
            message: 'Email must be a valid @bmu.edu.in or @bml.edu.in email address.',
        },
    },
    vp_email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^.+@(bmu|bml)\.edu\.in$/.test(value),
            message: 'Email must be a valid @bmu.edu.in or @bml.edu.in email address.',
        },
    },
    club_email: {
        type: String,
        validate: {
            validator: (value) => /^.+@(bmu|bml)\.edu\.in$/.test(value),
            message: 'Email must be a valid @bmu.edu.in or @bml.edu.in email address.',
        },
    },
    phone: {
        type: String,
    },
    insta: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    milestones: {
        type: String,
    },
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;