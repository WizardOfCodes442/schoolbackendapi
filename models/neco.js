//models/neco.js
const mongoose = require('mongoose');

const necoSchema = new mongoose.Schema({
    subjects: [{type: String, required:true}],
    exam_year: {type:Number, required: true},
    grades: [{type: String, required:true}],
    school: {type: String, required: true}
}, {collection: 'neco'});

module.exports = mongoose.model('Neco', necoSchema);
