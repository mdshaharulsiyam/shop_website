import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = "http://192.168.1.108:5004/"

const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [

  ],
  endpoints: () => ({}),
});

export default baseApis
