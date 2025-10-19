import baseApis from "../baseApi";

const reviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    // Get product reviews
    getProductReviews: builder.query({
      query: ({ productId, page = 1, limit = 10 }) => ({
        url: `review/product/${productId}`,
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['reviews'],
    }),
    
    // Create product review
    createReview: builder.mutation({
      query: (data) => ({
        url: 'review/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
});

export const { useGetProductReviewsQuery, useCreateReviewMutation } = reviewApis;
export default reviewApis;
