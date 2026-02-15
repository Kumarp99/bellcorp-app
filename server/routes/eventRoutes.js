const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // Import the middleware we just made

// 1. GET all events (Search & Category)
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};
        if (search) query.name = { $regex: search, $options: 'i' };
        if (category) query.category = category;

        const events = await Event.find(query);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST Register for an event (Protected Route)
router.post('/register', auth, async (req, res) => {
    try {
        const { eventId } = req.body;
        const event = await Event.findById(eventId);

        if (!event) return res.status(404).json({ message: "Event not found" });

        // Check if event is full
        if (event.capacity <= 0) {
            return res.status(400).json({ message: "Event is full!" });
        }

        // Reduce capacity by 1
        event.capacity -= 1;
        await event.save();

        res.json({ message: "Successfully registered!", updatedEvent: event });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;