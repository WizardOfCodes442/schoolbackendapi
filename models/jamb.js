const mongoose = require('mongoose');

const jambSchema = new mongoose.Schema({
    subjects: [{type:String, required: true}],
    year: {type:Number, required :true},
    scores: [{type: Number, required: true}],
    exam_centre: {type: String, required :true},
    total_score: {type: Number, required :true},



}, {collection: 'jamb'});

module.exports = mongoose.model('Jamb', jambSchema);