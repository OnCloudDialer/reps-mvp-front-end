import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";

export const tagService = createApi({
  reducerPath: "tag",
  tagTypes: ["Tags"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Tag
    createTag: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/tags",
        body: data,
      }),
      invalidatesTags: ["Tags"],
    }),

    // Get All Tags
    getTags: builder.query({
      providesTags: [{ type: "Tags" }],
      query: () => ({
        method: "GET",
        url: "/tags",
      }),
    }),

    // Get One Tag by ID
    getTagById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/tags/${id}`,
      }),
    }),

    // Update Tag
    updateTag: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/tags/${id}`,
        body: data,
      }),
      invalidatesTags: ["Tags"],
    }),

    // Delete Tag
    deleteTag: builder.mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `/tags/${id}`,
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});
export const {
  useGetTagsQuery,
  useGetTagByIdQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagService;
