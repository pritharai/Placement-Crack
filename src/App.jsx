import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import QuestionBank from './components/QuestionBank';
import MockTests from './components/MockTests';
// import Leaderboard from './components/Leaderboard';
// import Profile from './components/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/mock-tests" element={<MockTests />} />
            {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;