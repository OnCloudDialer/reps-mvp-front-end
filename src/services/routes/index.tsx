import Home from "../../components/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";
import ManageStore from "../../components/Store/Manage";
import ViewStore from "../../components/Store/ViewStore";
import ManageTags from "../../components/Tag/ManageTags";

export const AppRouteSlugs = {
  login: "/login",
  register: "/register",
  home: "/",
  manageStores: "/manage-stores",
  manageTags: "/manage-tags",
  viewStore: "/view-store/:id"
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
  },
  {
    path: AppRouteSlugs.manageStores,
    component: <ManageStore />
  },

  {
    path: AppRouteSlugs.manageTags,
    component: <ManageTags />
  },
  {
    path: AppRouteSlugs.viewStore,
    component: <ViewStore />
  },
]