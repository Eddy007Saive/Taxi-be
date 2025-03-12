import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateStation from"../pages/Station/Create"
import CreateTrajet from"../pages/Trajet/Create"




function AppRoutes() {
  return (
    <Router>
      
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
      <Route path="station" index element={<CreateStation />} />
      <Route path="trajet" index element={<CreateTrajet />} />


      </Route>
    </Routes>
  </Router>
  );
}

export default AppRoutes;
