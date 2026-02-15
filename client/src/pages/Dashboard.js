import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [myEvents, setMyEvents] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/api/events/my-events', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setMyEvents(res.data))
            .catch(err => console.log(err));
        }
    }, [token]);

    // Filter events for the summary
    const upcoming = myEvents.filter(e => new Date(e.date) > new Date());
    const past = myEvents.filter(e => new Date(e.date) <= new Date());
   

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>User Dashboard</h1>
            
            <h3>📅 Upcoming Events Summary ({upcoming.length})</h3>
            <ul>
                {upcoming.map(e => <li key={e._id}>{e.name} - {new Date(e.date).toLocaleDateString()}</li>)}
            </ul>

            <hr />

            <h3>📜 Past Event History ({past.length})</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px' }}>Event Name</th>
                        <th style={{ padding: '10px' }}>Date</th>
                        <th style={{ padding: '10px' }}>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {past.map(e => (
                        <tr key={e._id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{e.name}</td>
                            <td style={{ padding: '10px' }}>{new Date(e.date).toLocaleDateString()}</td>
                            <td style={{ padding: '10px' }}>{e.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
