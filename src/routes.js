/*
  Kalo nambah route disini ya, caranya gini :
    1. Import component2nya
    2. Masukin ke array APP_ROUTE, private itu berarti routenya cuman bisa diliat kalo udah login,
       restricted itu berarti routenya gak bisa diliat kalo udah login (Misal kalo aku masuk 
        halaman login padal udah login)
*/

import Login from "./view/Login";
import Dashboard from "./view/Dashboard";
import Register from "./view/Register";
import LandingPage from "./view/LandingPage";
import Tanamanku from "./view/Tanamanku";
import TambahTanaman from "./view/TambahTanaman";
import EditTanaman from "./view/EditTanaman";
import Tanaman from "./view/Tanaman";
import Pantau from "./view/Pantau";
import PantauEdit from "./view/PantauEdit";
import Tutorial from "./view/Tutorial";
import Profil from "./view/Profil";
import ReadArticle from "./view/ReadArticle";

export const APP_ROUTE = [
  {
    name: "LandingPage",
    path: "/",
    exact: true,
    component: LandingPage,
    restricted: true,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: Login,
    restricted: true,
  },
  {
    name: "Register",
    path: "/register",
    exact: true,
    component: Register,
    restricted: true,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    private: true,
  },
  {
    name: "Tanamanku",
    path: "/tanamanku",
    exact: true,
    component: Tanamanku,
    private: true,
  },
  {
    name: "TambahTanaman",
    path: "/TambahTanaman",
    exact: true,
    component: TambahTanaman,
    private: true,
  },
  {
    name: "EditTanaman",
    path: "/EditTanaman/:id",
    exact: true,
    component: EditTanaman,
    private: true,
  },
  {
    name: "Tanaman",
    path: "/Tanaman/:id",
    exact: true,
    component: Tanaman,
    private: true,
  },
  {
    name: "Pantau",
    path: "/Pantau/:id",
    exact: true,
    component: Pantau,
    private: true,
  },
  {
    name: "PantauEdit",
    path: "/PantauEdit/:id",
    exact: true,
    component: PantauEdit,
    private: true,
  },
  {
    name: "Tutorial",
    path: "/tutorial",
    exact: true,
    component: Tutorial,
    private: true,
  },
  {
    name: "Profil",
    path: "/profil",
    exact: true,
    component: Profil,
    private: true,
  },
  {
    name: "ReadArticle",
    path: "/ReadArticle/:id",
    exact: true,
    component: ReadArticle,
    private: true,
  },
];
