import baseApis from "../baseApi";

export const businessApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createBusiness: builder.mutation({
            query: (data) => ({
                url: '/business/create',
                method: 'POST',
                body: data
            }),
        }),
        updateBusiness: builder.mutation({
            query: (data) => ({
                url: '/business/update',
                method: 'PATCH',
                body: data
            }),
        }),
        getBusiness: builder.query({
            query: () => ({
                url: '/business/my-business',
                method: 'GET',
            }),
            providesTags: ['auth']
        }),
    }),
});

export const {
    useCreateBusinessMutation,
    useUpdateBusinessMutation,
    useGetBusinessQuery
} = businessApi;
