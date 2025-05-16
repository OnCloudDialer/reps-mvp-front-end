import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { ApiResponseDto } from "../type";
import { AreaTagForm, AreaTagType } from "./type";

export const areaTagService = createApi({
  reducerPath: "area-tags",
  tagTypes: ["Area-Tags"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Area Tag
    createAreaTag: builder.mutation<AreaTagType | undefined, AreaTagForm>({
      query: (data) => ({
        method: "POST",
        url: "/area-tag",
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<AreaTagType>) =>
        response.data,
      invalidatesTags: ["Area-Tags"],
    }),

    // Get All Area Tags
    getAreaTags: builder.query<AreaTagType[], void>({
      providesTags: [{ type: "Area-Tags" }],
      query: () => ({
        method: "GET",
        url: "/area-tag",
      }),
      transformResponse: (response: ApiResponseDto<AreaTagType[]>) =>
        response.data || [],
    }),

    // Get One Area Tag by ID
    getAreaTagById: builder.query<AreaTagType | undefined, string>({
      query: (id) => ({
        method: "GET",
        url: `/area-tag/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<AreaTagType>) =>
        response.data,
    }),

    // Update Area Tag
    updateAreaTag: builder.mutation<AreaTagType | undefined, AreaTagForm>({
      query: (data) => ({
        method: "PATCH",
        url: `/area-tag/${data.id}`,
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<AreaTagType>) =>
        response.data,
      invalidatesTags: ["Area-Tags"],
    }),

    // Delete Area Tag
    deleteAreaTag: builder.mutation<null, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `/area-tag/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<null>) =>
        response.data || null,
      invalidatesTags: ["Area-Tags"],
    }),
  }),
});
export const {
  useCreateAreaTagMutation,
  useUpdateAreaTagMutation,
  useGetAreaTagsQuery,
  useGetAreaTagByIdQuery,
  useDeleteAreaTagMutation,
} = areaTagService;
