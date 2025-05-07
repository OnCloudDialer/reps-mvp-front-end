import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { Contact, Store, StoreContact } from "./type";
import { ApiResponseDto } from "../type";

export const storeService = createApi({
  reducerPath: "store",
  tagTypes: ["Stores", "Store-Contacts"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Store
    createStore: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/stores",
        body: data,
      }),
      invalidatesTags: ["Stores"],
    }),

    // Get All Store
    getStore: builder.query({
      providesTags: [{ type: "Stores" }],
      query: (params) => ({
        method: "GET",
        params,
        url: "/stores",
      }),
    }),

    // Get update Store by ID
    updateStoreById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/stores/${id}`,
      }),
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
      { id: string; name?: string; roles?: string }
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
    createStoreContact: builder.mutation<StoreContact, Contact>({
      query: (data) => ({
        method: "POST",
        url: "/stores/contacts/create",
        body: data,
      }),
      invalidatesTags: ["Store-Contacts"],
    }),

    // Update Store Contact
    updateStoreContact: builder.mutation<StoreContact, Contact>({
      query: (data) => ({
        method: "PATCH",
        url: "/stores/contacts/update",
        body: data,
      }),
      invalidatesTags: ["Store-Contacts"],
    }),

    // Delete Store Contact
    deleteStoreContact: builder.mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `/stores/contacts/${id}`,
      }),
      invalidatesTags: ["Store-Contacts"],
    }),

    // Update Store
    updateStore: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/stores/${id}`,
        body: data,
      }),
      invalidatesTags: ["Stores"],
    }),

    // Delete Store
    deleteStore: builder.mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `/stores/${id}`,
      }),
      invalidatesTags: ["Stores"],
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
} = storeService;
