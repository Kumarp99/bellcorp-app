import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventDiscovery from './pages/EventDiscovery';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <nav style={{ padding: '15px', background: '#2c3e50', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>Bellcorp Events</Link>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>My Dashboard</Link>
              <button onClick={logout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>My Dashboard</Link>
              <Link to="/auth" style={{ color: 'white', textDecoration: 'none', border: '1px solid white', padding: '5px 10px', borderRadius: '4px' }}>Login / Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<EventDiscovery />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
