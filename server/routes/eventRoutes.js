const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth'); 

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

// 2. GET user's registered events (For the Dashboard)
router.get('/my-events', auth, async (req, res) => {
    try {
        // Find events where the logged-in user's ID is in the registeredUsers array
        const events = await Event.find({ registeredUsers: req.user.id });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
});

// 3. POST Register for an event (Protected Route)
router.post('/register', auth, async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user.id; // Get ID from the auth middleware token

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Check if user is already registered
        if (event.registeredUsers.includes(userId)) {
            return res.status(400).json({ message: "You are already registered for this event" });
        }

        // Check if event is full
        if (event.capacity <= 0) {
            return res.status(400).json({ message: "Event is full!" });
        }

        // Add user to the list and reduce capacity
        event.registeredUsers.push(userId);
        event.capacity -= 1;
        await event.save();

        res.json({ message: "Successfully registered!", updatedEvent: event });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
