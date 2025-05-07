import { createApi } from "@reduxjs/toolkit/query/react";
import { loginRequestDTO, loginResponse, signUpRequestDTO } from "./type";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { setUserAuthToken } from "../../helpers";
import { setAuthUser } from "../../app/slices/AuthUser";

export const authService = createApi({
  reducerPath: "auth",
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<loginResponse, loginRequestDTO>({
      query: (data: loginRequestDTO) => ({
        method: "POST",
        body: data,
        url: "/auth/login",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        if (data.data?.access_token) {
          setUserAuthToken(data.data.access_token);
          // Dispatch User
        }
        if (data.data) {
          await dispatch(setAuthUser(data.data.user));
        }
      },
    }),
    registerUser: builder.mutation<loginResponse, signUpRequestDTO>({
      query: (data: signUpRequestDTO) => ({
        method: "POST",
        body: data,
        url: "/auth/register",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        if (data.data?.access_token) {
          setUserAuthToken(data.data.access_token);
          // Dispatch User
          if (data.data) {
            await dispatch(setAuthUser(data.data.user));
          }
        }
      },
    }),
    refreshToken: builder.mutation<loginResponse, void>({
      query: () => "/auth/refresh-token",
      extraOptions: {
        silent: true,
      },
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        if (data.data?.access_token) {
          setUserAuthToken(data.data.access_token);
          // Dispatch User
          if (data.data) {
            await dispatch(setAuthUser(data.data.user));
          }
        }
      },
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshTokenMutation,
} = authService;
