import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Home } from "@/pages/dashboard";
import { New as NewTrajet } from "@/pages/trajet";
import { liste as Station,Create as NewStation } from "@/pages/station";
import { Create as NewChauufeur } from "@/pages/chauffeur";
import { SignIn, SignUp } from "@/pages/auth";

function App() {
  return (
    <Routes>
      {/* Routes Dashboard avec Outlet */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="vehicule" element={<Home />} /> {/* Remplacez par votre composant Vehicule quand disponible */}
        <Route path="chauffeur" element={<NewChauufeur />} />
        <Route path="station" element={<Station />} />
        <Route path="station/nouveau" element={<NewStation />} />
        <Route path="trajets" element={<NewTrajet />} />
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

export default App;