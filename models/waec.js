//models/waec.js

const mongoose = require('mongoose');

const waecSchema = new  mongoose.Schema({
    subjects: [{type: String, required: true}], 
    exam_year: {type: Number, required: true},
    grade: [{type:String, required: true}],
    school: {type:String, required: true}

}, { collection: 'waec' });

module.exports = mongoose.model('Waec', waecSchema);
