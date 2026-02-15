const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const dummyEvents = [
    {
        name: "Future Tech Expo 2026",
        location: "Silicon Valley",
        date: new Date("2026-08-15"), // Upcoming
        category: "Tech",
        capacity: 50,
        registeredUsers: []
    },
    {
        name: "Past Marketing Summit 2023",
        location: "New York",
        date: new Date("2023-11-10"), // Past
        category: "Marketing",
        capacity: 100,
        registeredUsers: []
    },
    {
        name: "Global Career Fair",
        location: "Remote",
        date: new Date("2026-12-01"), // Upcoming
        category: "Career",
        capacity: 200,
        registeredUsers: []
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB...");
        await Event.deleteMany({});
        await Event.insertMany(dummyEvents);
        console.log("✅ Database Seeded with Past & Future events!");
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
