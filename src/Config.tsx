const Config = {
   
   ['getGlobalConfig']: {
      oauth_client_id: '7ffsnujgue95dt8bkakfiqhonv',
      oauth_redirect_uri: 'http://localhost:8080',
      oauth_logout_endpoint: 'https://unitysds.auth.us-west-2.amazoncognito.com/logout',
      oauth_provider_url: 'https://unitysds.auth.us-west-2.amazoncognito.com/oauth2',
      app_admin_group_name: 'Unity_Admin',
      app_viewer_group_name: 'Unity_Viewer',
      unity_admin_email: 'anil.natha@jpl.nasa.gov'
   },

   ['sps']: {
      endpoint: 'http://a519940d6293d447a8668ea7bf86d326-1806755561.us-west-2.elb.amazonaws.com:5001/'
   },

   ['ads']: {
      url: 'http://uads-test-dockstore-deploy-lb-1762603872.us-west-2.elb.amazonaws.com:9998'
   }

}

export default Config;