import baseApis from "../baseApi";

export const cartApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createCart: builder.mutation({
      query: (data: {
        product_id: string;
        quantity: number;
        price: number;
        total_price: number;
        variants: Array<{ name: string; value: string }>;
      }) => ({
        url: "/cart/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    getCart: builder.query<
      { success: boolean; data: any[]; pagination?: any },
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/cart/get-all",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["cart"],
    }),
    deleteCart: builder.mutation<{ success: boolean; message?: string }, string>({
      query: (id: string) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const { useCreateCartMutation, useGetCartQuery, useDeleteCartMutation } = cartApi;
