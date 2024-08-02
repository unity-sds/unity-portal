import Config from '../Config';

// OAuth2 configs
const OAUTH2_CLIENT_ID = Config['auth'].oauth_client_id;
const OAUTH2_REDIRECT_URI = Config['auth'].oauth_redirect_uri;
const OAUTH2_LOGOUT_ENDPOINT = Config['auth'].oauth_logout_endpoint;

/**
 * Invokes logout for the the user and clears all the tokens
 */
export const logout = async () => {
  console.log("Logging User Out...")
  window.localStorage.clear();
  const logoutUrl = OAUTH2_LOGOUT_ENDPOINT +
      "?client_id=" + OAUTH2_CLIENT_ID +
      "&logout_uri=" + OAUTH2_REDIRECT_URI;
  window.location.replace(logoutUrl);
}
