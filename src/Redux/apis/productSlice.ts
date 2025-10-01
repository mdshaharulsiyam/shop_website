import baseApis from '../baseApi';

const productSlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProductsGroupByLabel: builder.query({
      query: () => ({
        url: 'product/group-by-label',
        method: 'GET',
      }),
    }),
    // Forward all provided args as query params to support filters (optional)
    getAllProduct: builder.query({
      query: (args) => ({
        url: 'product/get-all',
        method: 'GET',
        params: args
      }),
    }),
  }),
});

export const {
  useGetProductsGroupByLabelQuery,
  useGetAllProductQuery,
} = productSlice;
