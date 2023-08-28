const Config = {
   
   ['getGlobalConfig']: {
      oauth_client_id: import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID,
      oauth_redirect_uri: import.meta.env.VITE_AUTH_OAUTH_REDIRECT_URI,
      oauth_logout_endpoint: import.meta.env.VITE_AUTH_OAUTH_LOGOUT_ENDPOINT,
      oauth_provider_url: import.meta.env.VITE_AUTH_OAUTH_PROVIDER_URL,
      app_admin_group_name: import.meta.env.VITE_AUTH_APP_ADMIN_GROUP_NAME,
      app_viewer_group_name: import.meta.env.VITE_AUTH_APP_APP_VIEWER_GROUP_NAME,
      unity_admin_email: import.meta.env.VITE_ADMIN_EMAIL
   },

   ['sps']: {
      endpoint: import.meta.env.VITE_SPS_WPST_ENDPOINT
   },

   ['ads']: {
      url: import.meta.env.VITE_ADS_URL
   }

}

export default Config;