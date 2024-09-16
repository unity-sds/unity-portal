import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import App from './App';

import { useCookies } from 'react-cookie';

let token:string;
let email:string;
let username:string;

export const GetUsername = () => {
  return username;
};

export const GetEmail = () => {
  return email;
};

export const GetToken = () => {
  return token;
};

const AuthorizationWrapper = () => {

  const [cookies] = useCookies(["oidc_access_token", "oidc_claim_username", "oidc_claim_email"]);

  token = cookies.oidc_access_token;
  username = cookies.oidc_claim_username;
  email = cookies.oidc_claim_email;

  return (
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  );
}

export default AuthorizationWrapper;