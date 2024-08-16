const mongoose = require('mongoose');
const conferenceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
const Conference = mongoose.models.Conference || mongoose.model('Conference',conferenceSchema);
module.exports = Conference;