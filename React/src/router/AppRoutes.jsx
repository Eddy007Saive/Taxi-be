import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';



function AppRoutes() {
  return (
    <Router>
      
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
      </Route>
    </Routes>
  </Router>
  );
}

export default AppRoutes;
