import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { ApiResponseDto } from "../type";
import {
  Visit,
  VisitActivityForm,
  VisitActivityType,
  VisitForm,
  VisitNoteForm,
  VisitNoteQueryParams,
  VisitQueryParams,
} from "./type";
import { Note } from "../note/type";

export const visitService = createApi({
  reducerPath: "visits",
  tagTypes: ["Visits", "Visit-Notes", "Visit-Activity"],
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
    // Get One Store by ID
    getVisitById: builder.query<Visit | undefined, string>({
      query: (id) => ({
        method: "GET",
        url: `/visit/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<Visit>) => {
        return response.data;
      },
    }),
    // Create Visit Notes
    createVisitNote: builder.mutation<Note | undefined, VisitNoteForm>({
      query: (data) => ({
        method: "POST",
        url: "/visit/create-note",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Note>) => response.data,
      invalidatesTags: ["Visit-Notes"],
    }),

    getVisitNotes: builder.query<Note[] | undefined, VisitNoteQueryParams>({
      query: (params) => ({
        method: "GET",
        params,
        url: `/visit/notes/${params.visitId}`,
      }),
      transformResponse: (response: ApiResponseDto<Note[]>) => response.data,
    }),

    // Create Visit Activity
    createVisitActivity: builder.mutation<
      VisitActivityType | undefined,
      VisitActivityForm
    >({
      query: (data) => ({
        method: "POST",
        url: "/visit/create-activity",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<VisitActivityType>) =>
        response.data,
      invalidatesTags: ["Visit-Activity"],
    }),

    getVisitActivities: builder.query<
      VisitActivityType[] | undefined,
      VisitNoteQueryParams
    >({
      query: (params) => ({
        method: "GET",
        params,
        url: `/visit/activity/${params.visitId}`,
      }),
      transformResponse: (response: ApiResponseDto<VisitActivityType[]>) =>
        response.data,
    }),
  }),
});
export const {
  useCreateVisitMutation,
  useGetVisitsQuery,
  useLazyGetVisitsQuery,
  useGetVisitByIdQuery,
  useLazyGetVisitByIdQuery,
  useLazyGetVisitNotesQuery,
  useGetVisitNotesQuery,
  useCreateVisitNoteMutation,
  useCreateVisitActivityMutation,
  useLazyGetVisitActivitiesQuery,
  useGetVisitActivitiesQuery,
} = visitService;
