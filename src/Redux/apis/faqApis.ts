import baseApis from "../baseApi";

const faqApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    // Get all FAQs
    getAllFaqs: builder.query({
      query: () => ({
        url: 'faq/get-all',
        method: 'GET',
      }),
      providesTags: ['faq'],
    }),
  }),
});

export const { useGetAllFaqsQuery } = faqApis;
export default faqApis;
