import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import QuestionBank from './pages/QuestionBank';
import QuestionSolver from './components/QuestionSolver'
// import MockTests from './pages/MockTests';
// import LeaderBoard from './pages/LeaderBoard';
import UserProfile from './pages/UserProfile';
import Login from './components/auth/Login';
import {AdminAuth} from './components/auth/AdminAuth';
import {Logout} from './components/auth/Logout';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/questions" element={<QuestionBank />}/ >
            <Route path="/questionsolver" element={<QuestionSolver />} />
          
         
            {/* <Route path="/mock-tests" element={<MockTests />} /> */}
            {/* <Route path="/leaderboard" element={<LeaderBoard />} /> */}
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminauth" element={<AdminAuth />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;