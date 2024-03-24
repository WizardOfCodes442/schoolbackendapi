//models/coursereglist.js

const mongoose = require('mongoose');

const coursereglistSchema = new mongoose.Schema({
    courseregs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coursereg'}]
}, {collection: 'coursereglist'});

module.exports = mongoose.model('Coursereglist', coursereglistSchema);