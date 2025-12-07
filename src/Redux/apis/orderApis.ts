import baseApis from '../baseApi';



const orderApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({ url: '/order/create', method: 'POST', body }),
      invalidatesTags: ['cart'],
    }),
    getAllOrders: builder.query<
      { success?: boolean; message?: string; data?: any[]; result?: any[]; pagination?: any },
      { page?: number; limit?: number; delivery_status?: string; search?: string; myOrder?: boolean } | void
    >({
      query: (params) => ({
        url: '/order/get-all',
        method: 'GET',
        params: params || { page: 1, limit: 20 },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApi;
export default orderApi;
