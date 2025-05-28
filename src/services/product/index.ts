import { createApi } from "@reduxjs/toolkit/query/react";
import { RTKCustomFetchBase } from "../RTKfetchBase";
import { Product, ProductForm, ProductQueryParam } from "./type";
import { ApiResponseDto } from "../type";

export const productService = createApi({
  reducerPath: "product",
  tagTypes: ["Products"],
  baseQuery: RTKCustomFetchBase,
  endpoints: (builder) => ({
    // Create Store
    createProduct: builder.mutation<Product | undefined, ProductForm>({
      query: (data) => ({
        method: "POST",
        url: "/products",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: ApiResponseDto<Product>) {
        return baseQueryReturnValue.data;
      },
      invalidatesTags: ["Products"],
    }),

    // Get All Store
    getProduct: builder.query<Product[], ProductQueryParam | undefined>({
      providesTags: [{ type: "Products" }],
      query: (params) => ({
        method: "GET",
        params,
        url: "/products",
      }),
      transformResponse(baseQueryReturnValue: ApiResponseDto<Product[]>) {
        return baseQueryReturnValue.data || [];
      },
    }),

    // Get One Store by ID
    getProductById: builder.query<Product | undefined, string>({
      query: (id) => ({
        method: "GET",
        url: `/products/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<Product>) => {
        return response.data;
      },
    }),

    // Update Store
    updateProduct: builder.mutation<Product | undefined, ProductForm>({
      query: (data) => ({
        method: "PATCH",
        url: `/products/${data.id}`,
        body: data,
      }),
      transformResponse: (response: ApiResponseDto<Product>) => {
        return response.data;
      },
      invalidatesTags: ["Products"],
    }),

    // Delete Product
    deleteProduct: builder.mutation<null | undefined, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `/products/${id}`,
      }),
      transformResponse: (response: ApiResponseDto<null>) => {
        return response.data;
      },
      invalidatesTags: ["Products"],
    }),
    // Create Bulk Products
    createBulkProducts: builder.mutation<
      Product | undefined,
      { entities: unknown[] }
    >({
      query: (data) => ({
        method: "POST",
        url: "/products/bulk-create",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: ApiResponseDto<Product>) {
        return baseQueryReturnValue.data;
      },
      invalidatesTags: ["Products"],
    }),
  }),
});
export const {
  useCreateBulkProductsMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetProductQuery,
  useLazyGetProductByIdQuery,
  useLazyGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productService;
