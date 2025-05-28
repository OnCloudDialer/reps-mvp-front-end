import AreaTagManagement from "../../components/AreaTags/ManageAreaTags";
import ManageContacts from "../../components/Contact/Manage";
import ViewContact from "../../components/Contact/ViewContact";
import Home from "../../components/Home";
import Login from "../../components/Login";
import ManageProduct from "../../components/Product/ManageProduct";
import ViewProduct from "../../components/Product/ViewProduct";
import Register from "../../components/Register";
import ManageStore from "../../components/Store/Manage";
import ViewStore from "../../components/Store/ViewStore";
import ManageTags from "../../components/Tag/ManageTags";

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
    path: AppRouteSlugs.manageAreaTags,
    component: <AreaTagManagement />
  },

  {
    path: AppRouteSlugs.manageContacts,
    component: <ManageContacts />
  },
  {
    path: AppRouteSlugs.manageProducts,
    component: <ManageProduct />
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
]