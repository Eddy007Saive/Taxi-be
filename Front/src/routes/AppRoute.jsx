import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Home } from "@/pages/dashboard";
import { New as NewTrajet,liste as Trajet} from "@/pages/trajet";
import { liste as Station,Create as NewStation } from "@/pages/station";
import { liste as Chauffeur,Create as NewChauffeur } from "@/pages/chauffeur";
import { Create as NewVehicule, liste as Vehicule } from "@/pages/vehicule";

import { SignIn, SignUp } from "@/pages/auth";

export function AppRoute() {
  return (
    <Routes>
      {/* Routes Dashboard avec Outlet */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="chauffeur" element={<Chauffeur />} />
        <Route path="chauffeur/nouveau" element={<NewChauffeur />} />
        <Route path="station" element={<Station />} />
        <Route path="station/nouveau" element={<NewStation />} />
        <Route path="trajet" element={<Trajet />} />
        <Route path="trajet/nouveau" element={<NewTrajet />} />
        <Route path="vehicule" element={<Vehicule />} />
        <Route path="vehicule/nouveau" element={<NewVehicule />} />

        <Route path="voyage" element={<NewTrajet />} />

        
        {/* Redirection par défaut vers home */}
        <Route index element={<Navigate to="home" replace />} />
      </Route>
      
      {/* Routes Auth avec Outlet */}
      <Route path="/auth" element={<Auth />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        
        {/* Redirection par défaut vers sign-in */}
        <Route index element={<Navigate to="sign-in" replace />} />
      </Route>
      
      {/* Redirection globale */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

