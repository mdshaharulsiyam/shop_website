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
    getWebSettings: builder.query({
      query: () => ({
        url: `web-setting/get`,
        method: 'GET',
      }),
      providesTags: ['web_settings'],
    }),
  }),
});

export const { useGetSettingByNameQuery, useGetWebSettingsQuery } = settingApis;
export default settingApis;
