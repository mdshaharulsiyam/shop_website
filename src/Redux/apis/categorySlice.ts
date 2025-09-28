import baseApis from '../baseApi';

const categorySlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesWithSub: builder.query({
      query: () => ({
        url: '/category-sub/get-all',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesWithSubQuery } = categorySlice;
