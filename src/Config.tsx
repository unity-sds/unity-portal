import { Service } from "./state/slices/healthSlice";

type Config = {
  general: {
    appTitle:string,
    version:string,
    adminEmail:string,
    wwwDomain:string,
    basePath:string,
    project:string,
    venue:string,
    defaultRoutes:Service[]
  },
  auth: {
    oauthRedirectUri:string,
    oauthLogoutEndpoint:string,
    oauthProviderUrl:string,
    appAdminGroupName:string,
    appViewerGroupName:string,
  },
  cs: {
    healthEndpointUrl:string
  },
  ads: {
    url:string
  },
  sps: {
    endpoint:string
  }
}

const Config:Config = {

   ['general']: {
      appTitle: "MDPS",
      version: import.meta.env.VITE_UNITY_UI_VERSION,
      adminEmail: import.meta.env.VITE_ADMIN_EMAIL,
      wwwDomain: import.meta.env.VITE_WWW_DOMAIN,
      basePath: import.meta.env.VITE_BASE_PATH,
      project: import.meta.env.VITE_PROJECT,
      venue: import.meta.env.VITE_VENUE,
      defaultRoutes: [
        {
          componentName: "Health Dashboard",
          componentCategory: "",
          componentType: "ui",
          description: "Check the health status of services running in this venue.",
          healthChecks: [],
          healthCheckUrl: "",
          landingPageUrl: "/health-dashboard",
          nativeRoute: true,
          reportHealthStatus: false,
          route: "/health-dashboard",
          ssmKey: ""
        },
        {
          componentName: "Documentation (Gitbook)",
          componentCategory: "",
          componentType: "ui",
          description: "Documentation to help become familiar with the Unity platform.",
          healthChecks: [],
          healthCheckUrl: "",
          landingPageUrl: "https://unity-sds.gitbook.io/docs",
          nativeRoute: true,
          reportHealthStatus: false,
          route: "https://unity-sds.gitbook.io/docs",
          ssmKey: ""
        }
      ]
   },
   
   ['auth']: {
      //oauthClientId: import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID,
      oauthRedirectUri: import.meta.env.VITE_AUTH_OAUTH_REDIRECT_URI,
      oauthLogoutEndpoint: import.meta.env.VITE_AUTH_OAUTH_LOGOUT_ENDPOINT,
      oauthProviderUrl: import.meta.env.VITE_AUTH_OAUTH_PROVIDER_URL,
      appAdminGroupName: import.meta.env.VITE_AUTH_APP_ADMIN_GROUP_NAME,
      appViewerGroupName: import.meta.env.VITE_AUTH_APP_APP_VIEWER_GROUP_NAME,
   },

   ['cs']: {
      healthEndpointUrl: import.meta.env.VITE_HEALTH_API_ENDPOINT
   },

   ['ads']: {
      url: import.meta.env.VITE_ADS_URL
   },

   ['sps']: {
      endpoint: import.meta.env.VITE_SPS_WPST_ENDPOINT
   },

}

if( import.meta.env.DEV ) {
  // Output Configuration on every call to help with debugging only in DEV mode
  console.log(Config)
}

export default Config;