import { useCookies } from 'react-cookie';
import Config from '../Config';

// OAuth2 configs
const OAUTH2_CLIENT_ID = Config['getGlobalConfig'].oauth_client_id;
const OAUTH2_REDIRECT_URI = Config['getGlobalConfig'].oauth_redirect_uri;
const OAUTH2_LOGOUT_ENDPOINT = Config['getGlobalConfig'].oauth_logout_endpoint;


export const GetUsername = () => {
  const [cookies] = useCookies(['oidc_claim_username']);
  return cookies['oidc_claim_username'];
};

export const GetEmail = () => {
  const [cookies] = useCookies(['oidc_claim_email']);
  return cookies['oidc_claim_email'];
};

export const GetToken = () => {
  const [cookies] = useCookies(['oidc_access_token']);
  return cookies['oidc_access_token'];
};

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
