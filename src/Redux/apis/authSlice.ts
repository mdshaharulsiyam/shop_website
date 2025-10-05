import baseApis from '../baseApi';

const authSlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postLoginInof: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data
      }),
    }),
    postSignUp: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data
      }),
    }),
    patchNewPassword: builder.mutation({
      query: (data) => (
        {
          url: '/auth/change-password',
          method: 'PATCH',
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
getProfile:builder.query({
  query:()=>({
    url:"/auth/profile",
    method:"GET"
  })
})
  }),
});

export const {
  usePostLoginInofMutation,
  usePatchNewPasswordMutation,
  useForgetEmailPostMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  usePostSignUpMutation,
  useGetProfileQuery

} = authSlice;