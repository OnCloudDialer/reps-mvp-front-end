import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import {
  Store,
  StoreContact,
  StoreContactQueryParams,
  StoreForm,
  StoreQueryParams,
} from "./type";
import { ApiResponseDto } from "../type";
import { Contact, ContactNoteQueryParams } from "../contact/type";
import { Note, NoteForm } from "../note/type";

export const storeService = createApi({
  reducerPath: "store",
  tagTypes: ["Stores", "Store-Contacts", "Store-Notes"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Store
    createStore: builder.mutation<Store | undefined, StoreForm>({
      query: (data) => ({
        method: "POST",
        url: "/stores",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: ApiResponseDto<Store>) {
        return baseQueryReturnValue.data;
      },
      invalidatesTags: ["Stores"],
    }),

    // Get All Store
    getStore: builder.query<Store[], StoreQueryParams | undefined>({
      providesTags: [{ type: "Stores" }],
      query: (params) => ({
        method: "GET",
        params,
        url: "/stores",
      }),
      transformResponse(baseQueryReturnValue: ApiResponseDto<Store[]>) {
        return baseQueryReturnValue.data || [];
      },
    }),

    // Get update Store by ID
    updateStoreById: builder.query<Store | undefined, string>({
      query: (id) => ({
        method: "GET",
        url: `/stores/${id}`,
      }),
      transformResponse(baseQueryReturnValue: ApiResponseDto<Store>) {
        return baseQueryReturnValue.data;
      },
    }),

    // Get One Store by ID
    getStoreById: builder.query<Store | undefined, string>({
      query: (id) => ({
        method: "GET",
        url: `/stores/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<Store>) => {
        return response.data;
      },
    }),

    // Get One Store Contacts by ID
    getStoreContactsById: builder.query<
      ApiResponseDto<StoreContact[]>,
      StoreContactQueryParams
    >({
      providesTags: ["Store-Contacts"],
      query: ({ id, name, roles }) => ({
        method: "GET",
        params: {
          name,
          roles,
        },
        url: `/stores/contacts/${id}`,
        transformResponse: (response: ApiResponseDto<StoreContact[]>) => {
          return response.data;
        },
      }),
    }),

    // Create Store Contact
    createStoreContact: builder.mutation<StoreContact | undefined, Contact>({
      query: (data) => ({
        method: "POST",
        url: "/stores/contacts/create",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<StoreContact>) => {
        return response.data;
      },
      invalidatesTags: ["Store-Contacts"],
    }),

    // Update Store Contact
    updateStoreContact: builder.mutation<StoreContact | undefined, Contact>({
      query: (data) => ({
        method: "PATCH",
        url: "/stores/contacts/update",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<StoreContact>) => {
        return response.data;
      },
      invalidatesTags: ["Store-Contacts"],
    }),

    // Delete Store Contact
    deleteStoreContact: builder.mutation<null | undefined, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `/stores/contacts/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<null>) => {
        return response.data;
      },
      invalidatesTags: ["Store-Contacts"],
    }),

    // Update Store
    updateStore: builder.mutation<Store | undefined, StoreForm>({
      query: (data) => ({
        method: "PATCH",
        url: `/stores/${data.id}`,
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Store>) => {
        return response.data;
      },
      invalidatesTags: ["Stores"],
    }),

    // Delete Store
    deleteStore: builder.mutation<null | undefined, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `/stores/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<null>) => {
        return response.data;
      },
      invalidatesTags: ["Stores"],
    }),

    // Create Store Notes
    createStoreNote: builder.mutation<Note | undefined, NoteForm>({
      query: (data) => ({
        method: "POST",
        url: "/stores/create-note",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Note>) => response.data,
      invalidatesTags: ["Store-Notes"],
    }),

    getStoreNotes: builder.query<Note[] | undefined, ContactNoteQueryParams>({
      query: (params) => ({
        method: "GET",
        params,
        url: `/stores/notes/${params.storeId}`,
      }),
      transformResponse: (response: ApiResponseDto<Note[]>) => response.data,
    }),
  }),
});
export const {
  useCreateStoreMutation,
  useUpdateStoreByIdQuery,
  useUpdateStoreMutation,
  useLazyGetStoreQuery,
  useGetStoreQuery,
  useGetStoreByIdQuery,
  useLazyGetStoreByIdQuery,
  useDeleteStoreMutation,
  useGetStoreContactsByIdQuery,
  useLazyGetStoreContactsByIdQuery,
  useCreateStoreContactMutation,
  useUpdateStoreContactMutation,
  useDeleteStoreContactMutation,
  useCreateStoreNoteMutation,
  useGetStoreNotesQuery,
  useLazyGetStoreNotesQuery,
} = storeService;
