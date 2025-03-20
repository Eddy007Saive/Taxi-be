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

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routeS = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Acceuil",
        path: "/home", // Chemin complet avec /dashboard
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Vehicule",
        path: "/vehicule", // Chemin complet avec /dashboard
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Chauffeur",
        path: "/chauffeur", // Chemin complet avec /dashboard
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "Station",
        path: "/station", // Chemin complet avec /dashboard
      },
      {
        icon: <MapIcon {...icon} />,
        name: "Trajets",
        path: "/trajets", // Chemin complet avec /dashboard
      },
      {
        icon: <GlobeAltIcon {...icon} />,
        name: "Voyage",
        path: "/voyage", // Chemin complet avec /dashboard
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
        path: "/auth/sign-in", // Chemin complet avec /auth
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/auth/sign-up", // Chemin complet avec /auth
      },
    ],
  },
];

export default routeS;