import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './pages/register';
import Success from './pages/registerSuccess';
import Approval from './pages/approval';

function App() {
  return (
    <Router>
      <div>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/approval/:token" element={<Approval />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
