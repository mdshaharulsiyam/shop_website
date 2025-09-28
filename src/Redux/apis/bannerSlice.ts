import baseApis from '../baseApi';

const bannerSlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => ({
        url: '/banner/get-all',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetBannerQuery

} = bannerSlice;
