import ManageContacts from "../../components/Contact/Manage";
import ViewContact from "../../components/Contact/ViewContact";
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
  manageContacts: "/manage-contacts",
  manageTags: "/manage-tags",
  viewStore: "/view-store/:id",
  viewContact: "/view-contact/:id"
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
    path: AppRouteSlugs.manageContacts,
    component: <ManageContacts />
  },
  {
    path: AppRouteSlugs.viewContact,
    component: <ViewContact />
  },
  {
    path: AppRouteSlugs.viewStore,
    component: <ViewStore />
  },
]