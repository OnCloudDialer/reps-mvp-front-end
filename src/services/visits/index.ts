import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { ApiResponseDto } from "../type";
import { Visit, VisitForm, VisitQueryParams } from "./type";

export const visitService = createApi({
  reducerPath: "visits",
  tagTypes: ["Visits"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Visit
    createVisit: builder.mutation<Visit | undefined, VisitForm>({
      query: (data) => ({
        method: "POST",
        url: "/visit",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Visit>) => response.data,
      invalidatesTags: ["Visits"],
    }),

    // Get All Visits
    getVisits: builder.query<Visit[], VisitQueryParams>({
      providesTags: [{ type: "Visits" }],
      query: (params) => ({
        method: "GET",
        url: "/visit",
        params,
      }),
      transformResponse: (response: ApiResponseDto<Visit[]>) =>
        response.data || [],
    }),
  }),
});
export const {
  useCreateVisitMutation,
  useGetVisitsQuery,
  useLazyGetVisitsQuery,
} = visitService;
