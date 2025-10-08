import baseApis from '../baseApi';



const orderApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({ url: '/order/create', method: 'POST', body }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
export default orderApi;
