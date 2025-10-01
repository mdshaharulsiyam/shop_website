import baseApis from '../baseApi';

const productSlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProductsGroupByLabel: builder.query({
      query: () => ({
        url: 'product/group-by-label',
        method: 'GET',
      }),
    }),
    getAllProduct: builder.query({
      query: ({sort,order,page=1,limit}) => ({
        url: 'product/get-all',
        method: 'GET',
        params:{
          sort,
          order,
          page,
          limit
        }
      }),
    }),
  }),
});

export const {
  useGetProductsGroupByLabelQuery,
  useGetAllProductQuery,
} = productSlice;
