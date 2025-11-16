import baseApis from '../baseApi';

interface ShippingAddressItem {
  _id?: string;
  address: string;
}

interface GetAllResponse {
  success: boolean;
  message?: string;
  result?: ShippingAddressItem[];
  data?: ShippingAddressItem[]; // fallback if backend uses data
}

interface CreateResponse {
  success: boolean;
  message?: string;
  data?: ShippingAddressItem;
  result?: ShippingAddressItem;
}

const shippingAddressApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllShippingAddresses: builder.query<GetAllResponse, void>({
      query: () => ({ url: '/shipping-address/get-all', method: 'GET' }),
      providesTags: ['shipping_address']
    }),
    createShippingAddress: builder.mutation<CreateResponse, { address: string }>({
      query: (body) => ({ url: '/shipping-address/create', method: 'POST', body }),
      invalidatesTags: ['shipping_address']
    }),
  }),
});

export const { useGetAllShippingAddressesQuery, useCreateShippingAddressMutation } = shippingAddressApi;
export default shippingAddressApi;
