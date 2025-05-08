import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { ApiResponseDto } from "../type";
import {
  Contact,
  ContactForm,
  ContactNoteQueryParams,
  ContactQueryParams,
} from "./type";
import { Note, NoteForm } from "../note/type";

export const contactService = createApi({
  reducerPath: "contact",
  tagTypes: ["Contacts", "Contacts-Note"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Contact
    createContact: builder.mutation<Contact | undefined, ContactForm>({
      query: (data) => ({
        method: "POST",
        url: "/contact/create",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Contact>) => response.data,
      invalidatesTags: ["Contacts"],
    }),

    // Update Contact
    updateContact: builder.mutation<Contact | undefined, ContactForm>({
      query: (data) => ({
        method: "PATCH",
        url: "/contact/update",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Contact>) => response.data,
      invalidatesTags: ["Contacts"],
    }),

    // Fetching Single Contacts with ID
    getSingleContact: builder.query<Contact | undefined, string>({
      providesTags: ["Contacts"],
      query: (id) => ({
        method: "GET",
        url: `/contact/find/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<Contact>) => {
        return response.data || undefined;
      },
    }),

    // Fetching All Contacts with Query Params
    getContacts: builder.query<Contact[], ContactQueryParams | undefined>({
      providesTags: ["Contacts"],
      query: (params) => ({
        method: "GET",
        params: params,
        url: `/contact/find-all`,
      }),
      transformResponse: (response: ApiResponseDto<Contact[]>) => {
        return response.data || [];
      },
    }),
    // Deleting Contact
    deleteContact: builder.query<Contact, string>({
      query: (id) => ({
        method: "DELETE",
        url: `/contact/delete/${id}`,
      }),
    }),
    // Create Contact Notes
    createContactNote: builder.mutation<Note | undefined, NoteForm>({
      query: (data) => ({
        method: "POST",
        url: "/contact/create-note",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Note>) => response.data,
      invalidatesTags: ["Contacts-Note"],
    }),

    getContactNotes: builder.query<Note[] | undefined, ContactNoteQueryParams>({
      query: (params) => ({
        method: "GET",
        params,
        url: `/contact/notes/${params.contactId}`,
      }),
      transformResponse: (response: ApiResponseDto<Note[]>) => response.data,
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactsQuery,
  useLazyGetContactsQuery,
  useUpdateContactMutation,
  useLazyDeleteContactQuery,
  useGetSingleContactQuery,
  useLazyGetSingleContactQuery,
  useCreateContactNoteMutation,
  useLazyGetContactNotesQuery,
  useGetContactNotesQuery,
} = contactService;
