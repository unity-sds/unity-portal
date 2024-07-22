import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import App from './App';

import { useCookies } from 'react-cookie';

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

const AuthorizationWrapper = () => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  );
}

export default AuthorizationWrapper;