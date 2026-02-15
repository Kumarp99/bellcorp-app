const mongoose = require('mongoose');
const Event = require('./models/Event');

// Hardcoded URI to bypass the .env error
const MONGO_URI = "mongodb://127.0.0.1:27017/bellcorp";
const dummyEvents = [
    { name: "Tech Summit 2026", organizer: "Bellcorp", location: "Mumbai", date: new Date(), description: "AI & Robotics Workshop", capacity: 100, category: "Tech" },
    { name: "Marketing Night", organizer: "Growth Hub", location: "Online", date: new Date(), description: "Digital Marketing Trends", capacity: 50, category: "Marketing" },
    { name: "Career Fair", organizer: "HR Connect", location: "New York", date: new Date(), description: "Networking Event", capacity: 200, category: "Career" }
];

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB...");
        await Event.deleteMany({}); 
        await Event.insertMany(dummyEvents);
        console.log("✅ Database Seeded Successfully!");
        process.exit();
    })
    .catch(err => {
        console.error("❌ Seed Error:", err);
        process.exit(1);
    });