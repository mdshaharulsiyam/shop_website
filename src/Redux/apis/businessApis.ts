import baseApis from "../baseApi";

export const businessApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createBusiness: builder.mutation({
            query: (data) => ({
                url: '/business/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['auth']
        }),
        updateBusiness: builder.mutation({
            // expects { id, data }
            query: ({ id, data }: { id: string; data: FormData }) => ({
                url: `/business/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['auth']
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
