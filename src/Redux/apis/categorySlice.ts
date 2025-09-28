import baseApis from '../baseApi';

const categorySlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesWithSub: builder.query({
      query: () => ({
        url: '/category-sub/get-all',
        method: 'GET',
      }),
    }),
    getCategoryGroup: builder.query({
      query: ({ page, limit = 9999999 }) => ({
        url: '/category-sub-group/get-all',
        method: 'GET',
        params: { page, limit }
      }),
    }),
  }),
});

export const {
  useGetCategoriesWithSubQuery,
  useGetCategoryGroupQuery

} = categorySlice;
