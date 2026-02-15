Bellcorp Event Management System
A Full-Stack MERN application designed for seamless event discovery and real-time registration.

🚀 Features
Authentication: Secure user Login and Sign-up using JWT and Bcrypt hashing.

Event Discovery: Browse events with real-time search and category filtering.

Registration: Protected routes for event registration with automatic capacity management.

Responsive UI: Built with React and CSS-in-JS for a clean, modern experience.

🛠️ Tech Stack
Frontend: React.js, Axios, React Router

Backend: Node.js, Express.js

Database: MongoDB (Local)

Security: JSON Web Tokens (JWT)

⚙️ Installation & Setup
1. Prerequisites
    Node.js installed

MongoDB Community Server running locally

2. Backend Setup
Navigate to the server directory:

    cd server


Install dependencies:

    npm install


Create a .env file and add:

Plaintext

    MONGO_URI=mongodb://127.0.0.1:27017/bellcorp
    PORT=5000
    JWT_SECRET=bellcorp_secret_key_123

Seed the database with sample events:


    node seed.js

Start the server:

    node server.js

3. Frontend Setup
Open a new terminal and navigate to the client directory:

    cd client

Install dependencies:

    npm install

Start the application:

    npm start

    
📁 Project Structure
Plaintext

bellcorp-app/
├── client/             # React Frontend
│   ├── src/
│   │   ├── pages/      # Auth.js, EventDiscovery.js
│   │   └── App.js      # Routing logic
├── server/             # Node.js Backend
│   ├── models/         # Mongoose Schemas (User, Event)
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth validation
│   └── server.js       # Entry point
└── README.md
📝 Demo Instructions
Open http://localhost:3000.

Browse events using the Search Bar or Category Filter.

Click "Register Now" (System will prompt for login).

Navigate to Login/Register, create an account, and log in.

Successfully register for an event and observe the capacity decrease.