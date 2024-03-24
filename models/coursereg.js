//model/coursereg.js

const mongoose = require('mongoose');

const courseregSchema = new mongoose.Schema({
    faculty: { type: String, required: true },
    level: {type: Number, required: true},
    year: {type: Number, required: true},
    dept: {type:String, required: true},
    courses: [{type:String, required: true}],
    course_units: [{type: Number, required: true}],
    semester: {type:String, required: true}, // 
}, {collection: 'coursereg'});

module.exports = mongoose.model('Coursereg', courseregSchema);

