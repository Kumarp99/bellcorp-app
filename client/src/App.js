import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventDiscovery from './pages/EventDiscovery';
import Auth from './pages/Auth';

function App() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Router>
      <nav style={{ padding: '15px', background: '#2c3e50', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Bellcorp Events</Link>
        </div>
        <div>
          {localStorage.getItem('token') ? (
            <button onClick={logout} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          ) : (
            <Link to="/auth" style={{ color: 'white', textDecoration: 'none' }}>Login / Register</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<EventDiscovery />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;