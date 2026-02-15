import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventDiscovery = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(''); // New: Category state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // We fetch events based on both search and category
        axios.get(`http://localhost:5000/api/events?search=${search}&category=${category}`)
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching events:", err);
                setLoading(false);
            });
    }, [search, category]);

    const handleRegister = async (eventId, eventName) => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert(`Please login to register for "${eventName}"`);
            // You can use navigate('/login') here later
            return;
        }

        try {
           await axios.post('https://bellcorp-app.onrender.com/api/events/register',
                { eventId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`Successfully registered for ${eventName}!`);
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
            <h2 style={{ color: '#333' }}>Bellcorp Event Discovery</h2>
            
            {/* Search and Filter Section */}
            <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    placeholder="Search by name..." 
                    style={{ padding: '12px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                <select 
                    style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Tech">Tech</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Career">Career</option>
                </select>
            </div>

            {loading ? (
                <p>Loading events...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} style={{ 
                                background: 'white', 
                                padding: '20px', 
                                borderRadius: '12px', 
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s'
                            }}>
                                <span style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>{event.category}</span>
                                <h3 style={{ margin: '10px 0', color: '#2c3e50' }}>{event.name}</h3>
                                <p style={{ color: '#7f8c8d' }}><strong>📍</strong> {event.location}</p>
                                <p style={{ fontSize: '14px', color: '#34495e' }}>{event.description}</p>
                                
                                <button 
                                    onClick={() => handleRegister(event._id, event.name)}
                                    style={{ 
                                        width: '100%',
                                        background: '#28a745', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '12px', 
                                        borderRadius: '6px', 
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        marginTop: '10px'
                                    }}
                                >
                                    Register Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No events found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventDiscovery;
