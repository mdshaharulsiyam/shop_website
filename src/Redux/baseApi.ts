import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const server = "http://localhost:5004"//http://10.10.20.40:5004/ //http://192.168.1.108:5004
export const dashboard_link = "http://localhost:5005"//http://10.10.20.40:5005/ //http://192.168.1.108:5005
const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: server,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "auth",
    "faq",
    "settings",
    "contact",
    "reviews"
  ],
  endpoints: () => ({}),
});
export const imageUrl = (url: string) => {
  return url?.includes("http") ? url : url?.startsWith("/") ? `${server}${url}` : `${server}/${url}`
}
export default baseApis
