const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    date: { type: Date, required: true }, // Needed for Past/Upcoming summary
    category: { type: String, required: true },
    capacity: { type: Number, required: true },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Track users
});

module.exports = mongoose.model('Event', EventSchema);
