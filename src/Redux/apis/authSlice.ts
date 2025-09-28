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
        console.log(data); // there i can get eamil
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/forget-pass-otp-verify',
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
    })

  }),
});

export const {
  usePostLoginInofMutation,
  usePatchNewPasswordMutation,
  useForgetEmailPostMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation } = authSlice;