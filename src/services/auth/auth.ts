import { createApi } from "@reduxjs/toolkit/query/react";
import {
  loginRequestDTO,
  loginResponse,
  OrganizationActivitiesType,
  signUpRequestDTO,
} from "./type";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { setUserAuthToken } from "../../helpers";
import { setAuthUser } from "../../app/slices/AuthUser";
import { ApiResponseDto } from "../type";

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

    getActivities: builder.query<OrganizationActivitiesType, void>({
      query: () => ({
        method: "GET",
        url: "/auth/activities",
      }),
      transformResponse: (
        response: ApiResponseDto<OrganizationActivitiesType>
      ) =>
        response.data || {
          totalContacts: 0,
          totalProducts: 0,
          totalStores: 0,
        },
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshTokenMutation,
  useGetActivitiesQuery,
  useLazyGetActivitiesQuery,
} = authService;
