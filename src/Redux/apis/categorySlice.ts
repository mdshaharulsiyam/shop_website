import baseApis from '../baseApi';

const categorySlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    // Unified categories endpoint
    // When parent_id is provided -> returns sub-categories of that parent
    // When parent_id is omitted -> returns top-level categories
    getCategories: builder.query({
      query: ({ page = 1, limit = 20, parent_id }: { page?: number; limit?: number; parent_id?: string }) => ({
        url: 'category/get-all',
        method: 'GET',
        params: { page, limit, parent_id },
      }),
    }),
    // Legacy endpoints kept for backward compatibility
    getCategoriesWithSub: builder.query({
      query: () => ({
        url: '/category-sub/get-all',
        method: 'GET',
      }),
    }),
    getCategoryGroup: builder.query({
      query: ({ page, limit = 9999999 }: { page?: number; limit?: number }) => ({
        url: '/category-sub-group/get-all',
        method: 'GET',
        params: { page, limit }
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesWithSubQuery,
  useGetCategoryGroupQuery,
} = categorySlice;
