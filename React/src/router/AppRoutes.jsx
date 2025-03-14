import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateStation from "../pages/Station/Create"
import CreateTrajet from "../pages/Trajet/Create"
import CreateChauffeur from "../pages/Chauffeur/Create"
import ViewChauffeur from "../pages/Chauffeur/View"
import CreateVehicule from "../pages/Vehicule/Create"
import ViewVehicule from "../pages/Vehicule/View"




function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="chauffeur" index element={<ViewChauffeur />} />
          <Route path="chauffeur/new" index element={<CreateChauffeur />} />
          <Route path="vehicule" index element={<ViewVehicule/>} />
          <Route path="vehicule/new" index element={<CreateVehicule />} />
          <Route path="station" index element={<CreateStation />} />
          <Route path="trajet" index element={<CreateTrajet />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
