import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PracticePage from './pages/PracticePage';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  const handleLoginSuccess = (loggedInUserName) => {
    setUserName(loggedInUserName);
    localStorage.setItem('userName', loggedInUserName);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/practice" 
          element={<PracticePage userName={userName} onLoginSuccess={handleLoginSuccess} />} 
        />
        {/* Thêm các route khác nếu cần */}
        <Route 
          path="*" 
          element={<Navigate to="/practice" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
