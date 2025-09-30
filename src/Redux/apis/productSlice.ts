import baseApis from '../baseApi';

const productSlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProductsGroupByLabel: builder.query({
      query: () => ({
        url: 'product/group-by-label',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetProductsGroupByLabelQuery,
} = productSlice;
