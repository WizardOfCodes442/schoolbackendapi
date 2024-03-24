const mongoose = require('mongoose');

const biodataSchema = new mongoose.Schema({
    waec_id:{type: mongoose.Schema.Types.ObjectId, ref :'Waec'},
    neco_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Neco'},
    jamb_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Jamb'}

}, {collection: 'biodata'});


module.exports = mongoose.model('Biodata', biodataSchema);