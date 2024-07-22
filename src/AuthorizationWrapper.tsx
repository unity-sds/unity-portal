import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import App from './App';

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