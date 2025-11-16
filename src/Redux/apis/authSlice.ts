import baseApis from '../baseApi';

const authSlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (body: { credential: string }) => ({
        url: '/auth/google',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth']
    }),
    postLoginInof: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    postSignUp: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    patchNewPassword: builder.mutation({
      query: (data) => (
        {
          url: '/auth/change-password',
          method: 'POST',
          body: data
        }
      )
    }),
    forgetEmailPost: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/verification/verify',
        method: 'POST',
        body: data
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => (
        console.log(data),
        {
          url: '/auth/reset-password',
          method: 'POST',
          body: data
        }
      )
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET"
      }),
      providesTags: ['auth']
    }),
    patchProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/update-profile',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['auth']
    })
  }),
});

export const {
  useGoogleLoginMutation,
  usePostLoginInofMutation,
  usePatchNewPasswordMutation,
  useForgetEmailPostMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  usePostSignUpMutation,
  useGetProfileQuery,
  usePatchProfileMutation
} = authSlice;