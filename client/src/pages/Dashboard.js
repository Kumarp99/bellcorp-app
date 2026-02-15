import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [myEvents, setMyEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Get logged in user

    useEffect(() => {
        const fetchMyEvents = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/events/my-registrations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyEvents(res.data);
        };
        if (user) fetchMyEvents();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome, {user?.name}</h1>
            <h2>Your Registered Events</h2>
            {myEvents.map(reg => (
                <div key={reg._id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                    <h3>{reg.event.name}</h3>
                    <p>{new Date(reg.event.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;