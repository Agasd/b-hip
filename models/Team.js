const mongoose = require('mongoose');


const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    partner: { type: String, required: true },
    members: { type: [String], required: true }
});


module.exports = mongoose.model('Team', TeamSchema);