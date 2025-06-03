import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/auth/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rtkQueryErrorLogger } from "../services/middlewares/RequestHandler";
import authUser from "./slices/AuthUser";
import { tagService } from "../services/tag";
import { storeService } from "../services/store";
import { contactService } from "../services/contact";
import { areaTagService } from "../services/areaTag";
import { productService } from "../services/product";
import { visitService } from "../services/visits";

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [tagService.reducerPath]: tagService.reducer,
    [visitService.reducerPath]: visitService.reducer,
    [productService.reducerPath]: productService.reducer,
    [storeService.reducerPath]: storeService.reducer,
    [contactService.reducerPath]: contactService.reducer,
    [areaTagService.reducerPath]: areaTagService.reducer,
    authUser: authUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(tagService.middleware)
      .concat(visitService.middleware)
      .concat(productService.middleware)
      .concat(areaTagService.middleware)
      .concat(contactService.middleware)
      .concat(storeService.middleware)
      .concat(rtkQueryErrorLogger),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
