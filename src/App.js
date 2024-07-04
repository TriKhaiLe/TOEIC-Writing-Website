import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PracticePage from './pages/PracticePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/practice" element={<PracticePage />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
}

export default App;
