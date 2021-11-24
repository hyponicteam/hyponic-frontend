/*
  Kalo nambah route disini ya, caranya gini :
    1. Import component2nya
    2. Masukin ke array APP_ROUTE, private itu berarti routenya cuman bisa diliat kalo udah login,
       restricted itu berarti routenya gak bisa diliat kalo udah login (Misal kalo aku masuk 
        halaman login padal udah login)
*/

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import Tanamanku from "./Components/Tanamanku";
import Tanaman from "./Components/Tanaman";
import Pantau from "./Components/Pantau";
import TambahTanaman from "./Components/TambahTanaman";
import PantauEdit from "./Components/PantauEdit";
import EditTanaman from "./Components/EditTanaman";
import Profile from "./Components/Profile";

export const APP_ROUTE = [
  {
    name: "Login",
    path: "/",
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
    path: "/Tanamanku",
    exact: true,
    component: Tanamanku,
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
    name: "TambahTanaman",
    path: "/TambahTanaman",
    exact: true,
    component: TambahTanaman,
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
    name: "EditTanaman",
    path: "/EditTanaman/:id",
    exact: true,
    component: EditTanaman,
    private: true,
  },
  {
    name: "Profile",
    path: "/Profile",
    exact: true,
    component: Profile,
    private: true,
  },
];
