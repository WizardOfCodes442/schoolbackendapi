const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstname: {type: String, require: true},
    secondname: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: String, required: true},
    date_of_birth: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true}, 
    city: {type: String, required: true},
    street: {type: String, required: true},
    zipcode: {type:String, required: true},
    matric_number: {type: String, required: true},
    verified: {type: Boolean, default: false}
}, { collection: 'profile' });

module.exports = mongoose.model('Profile', profileSchema);