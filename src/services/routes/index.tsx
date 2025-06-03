import AreaTags from "../../screens/AreaTags";
import Login from "../../screens/Authentication/Login";
import Register from "../../screens/Authentication/Register";
import Contacts from "../../screens/Contact";
import ViewContact from "../../screens/Contact/ViewContact";
import Home from "../../screens/Dashboard";
import Product from "../../screens/Product";
import ViewProduct from "../../screens/Product/ViewProduct";
import Store from "../../screens/Store";
import ViewStore from "../../screens/Store/ViewStore";
import Tags from "../../screens/Tag";
import Visit from "../../screens/Visit";
import ViewVisit from "../../screens/Visit/ViewVisit";

export const AppRouteSlugs = {
  login: "/login",
  register: "/register",
  home: "/",
  manageStores: "/manage-stores",
  manageProducts: "/manage-products",
  manageContacts: "/manage-contacts",
  manageTags: "/manage-tags",
  manageAreaTags: "/manage-area-tags",
  viewStore: "/view-store/:id",
  viewProduct: "/view-product/:id",
  viewContact: "/view-contact/:id",
  visitDashboard: "/visit-dashboard",
  viewVisit: "/view-visit/:id",
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
    component: <Store />
  },

  {
    path: AppRouteSlugs.manageTags,
    component: <Tags />
  },

  {
    path: AppRouteSlugs.manageAreaTags,
    component: <AreaTags />
  },

  {
    path: AppRouteSlugs.manageContacts,
    component: <Contacts />
  },
  {
    path: AppRouteSlugs.manageProducts,
    component: <Product />
  },
  {
    path: AppRouteSlugs.viewProduct,
    component: <ViewProduct />
  },
  {
    path: AppRouteSlugs.viewContact,
    component: <ViewContact />
  },
  {
    path: AppRouteSlugs.viewStore,
    component: <ViewStore />
  },

  {
    path: AppRouteSlugs.visitDashboard,
    component: <Visit />
  },
  {
    path: AppRouteSlugs.viewVisit,
    component: <ViewVisit />
  },
]