const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    biodata_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Biodata'},
    coursereglist_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Coursereglist'},
}, { collection: 'student' })

module.exports = mongoose.model('Student', studentSchema);