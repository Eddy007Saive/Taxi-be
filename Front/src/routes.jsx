import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  MapPinIcon,
  TruckIcon,
  MapIcon,
  GlobeAltIcon
} from "@heroicons/react/24/solid";
import { Home} from "@/pages/dashboard";
import { New as NewTrajet} from "@/pages/trajet";
import { Create as NewStation} from "@/pages/station";

import { Create as NewChauufeur} from "@/pages/chauffeur";


import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Acceuil",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Vehicule",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Chauffeur",
        path: "/NewChauufeur",
        element: <NewChauufeur />,
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "Station",
        path: "/NewStation",
        element: <NewStation />,
      },
      {
        icon: <MapIcon {...icon} />,
        name: "Trajets",
        path: "/notifications",
        element: <NewTrajet />,
      },

      {
        icon: <GlobeAltIcon {...icon} />,
        name: "Voyage",
        path: "/voyage",
        element: <NewTrajet />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
