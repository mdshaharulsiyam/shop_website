import baseApis from "../baseApi";

const contactApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    // Create contact message
    createContact: builder.mutation({
      query: (data) => ({
        url: 'contact/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['contact'],
    }),
  }),
});

export const { useCreateContactMutation } = contactApis;
export default contactApis;
