import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { Tag, TagForm } from "./type";
import { ApiResponseDto } from "../type";

export const tagService = createApi({
  reducerPath: "tag",
  tagTypes: ["Tags"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Tag
    createTag: builder.mutation<Tag | undefined, TagForm>({
      query: (data) => ({
        method: "POST",
        url: "/tags",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Tag>) => response.data,
      invalidatesTags: ["Tags"],
    }),

    // Get All Tags
    getTags: builder.query<Tag[], void>({
      providesTags: [{ type: "Tags" }],
      query: () => ({
        method: "GET",
        url: "/tags",
      }),
      transformResponse: (response: ApiResponseDto<Tag[]>) =>
        response.data || [],
    }),

    // Get One Tag by ID
    getTagById: builder.query<Tag | undefined, string>({
      query: (id) => ({
        method: "GET",
        url: `/tags/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<Tag>) => response.data,
    }),

    // Update Tag
    updateTag: builder.mutation<Tag | undefined, TagForm>({
      query: (data) => ({
        method: "PATCH",
        url: `/tags/${data.id}`,
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Tag>) => response.data,
      invalidatesTags: ["Tags"],
    }),

    // Delete Tag
    deleteTag: builder.mutation<null, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `/tags/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<null>) =>
        response.data || null,
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
