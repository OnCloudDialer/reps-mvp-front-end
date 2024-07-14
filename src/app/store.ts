import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/auth/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rtkQueryErrorLogger } from "../services/middlerwares/RequestHandler";
import authUser from "./slices/AuthUser";

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    authUser: authUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(rtkQueryErrorLogger),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
