import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData);
            
            // Save token and user info to browser storage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            alert(`${isLogin ? 'Login' : 'Registration'} Successful!`);
            navigate('/'); // Go back to events page
        } catch (err) {
            alert(err.response?.data?.message || "Authentication Failed");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', width: '350px' }}>
                <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {!isLogin && (
                        <input 
                            type="text" placeholder="Full Name" required
                            style={{ padding: '10px' }}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    )}
                    <input 
                        type="email" placeholder="Email" required
                        style={{ padding: '10px' }}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                        type="password" placeholder="Password" required
                        style={{ padding: '10px' }}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#007bff' }} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default Auth;