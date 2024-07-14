import Home from "../../components/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";

export const AppRouteSlugs = {
  login: "/login",
  register: "/register",
  home: "/",
};


export const GuestRoutes = [
  {
    path: AppRouteSlugs.login,
    component: <Login />
  },
  {
    path: AppRouteSlugs.register,
    component: <Register />
  },
]

export const AppRoutes = [
  {
    path: AppRouteSlugs.home,
    component: <Home />
  }
]