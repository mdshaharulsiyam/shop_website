import baseApis from "../baseApi";

const settingApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    // Get settings by name (about, terms, privacy)
    getSettingByName: builder.query({
      query: (name) => ({
        url: `setting/${name}`,
        method: 'GET',
      }),
      providesTags: ['settings'],
    }),
  }),
});

export const { useGetSettingByNameQuery } = settingApis;
export default settingApis;
