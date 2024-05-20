// @ts-nocheck

/**
 * The AuthenticationWrapper.js is a wrapper for App.js to implement the OAuth2 Authorization Code Grant with PKCE (Proof Key for Code Exchange)
 * using react-oauth2-pkce library.
 */
import App from './App';
import {AuthProvider, AuthService, useAuth} from 'react-oauth2-pkce'
import jwt_decode from "jwt-decode";
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';

import Config from './Config';

// Variable to store user related info
let tokens;
let loggedInUserName:string;

// AuthButton Style
// TODO added temporarily. As style matching with the theme of doi-ui should be added later.
const AuthButton = styled.button`
  background-color: #286491;
  color: white;
  font-size: 16px;
  padding: 10px 60px;
  borderRadius: 20,
  margin: 7px 7px;
  cursor: pointer;
`;

// OAuth2 configs
const OAUTH2_CLIENT_ID = Config['getGlobalConfig'].oauth_client_id;
const OAUTH2_REDIRECT_URI = Config['getGlobalConfig'].oauth_redirect_uri
const OAUTH2_LOGOUT_ENDPOINT = Config['getGlobalConfig'].oauth_logout_endpoint
const OAUTH2_PROVIDER_URL = Config['getGlobalConfig'].oauth_provider_url
const APP_VIEWER_GROUP_NAME = Config['getGlobalConfig'].app_admin_group_name
const APP_ADMIN_GROUP_NAME = Config['getGlobalConfig'].app_viewer_group_name
const UNITY_ADMIN_EMAIL = Config['getGlobalConfig'].unity_admin_email

// Initialize AuthService
const authService = new AuthService({
    provider: OAUTH2_PROVIDER_URL,
    clientId: OAUTH2_CLIENT_ID,
    redirectUri: OAUTH2_REDIRECT_URI,
    autoRefresh: true, // Enable automatic token refresh
    scopes: ['openid', 'profile'],
});

/**
 * Checks if a given access token has a given userGroup.
 *
 * @param accessToken
 * @param userGroup
 * @returns true if the given access token has the given userGroup, else false
 */
function hasUserGroup(accessToken, userGroup) {

    const accessTokenDecoded = decodeToken(accessToken);

    let cognitoGroups = "No User Groups";
    if (accessTokenDecoded["cognito:groups"] != null) {
        cognitoGroups = accessTokenDecoded["cognito:groups"].toString();
    }

    const userGroupsArray = cognitoGroups.split(',').map(function(item) {
        return item.trim();
    });

    return userGroupsArray.includes(userGroup);
}

/**
 * Decodes an encodedToken.
 *
 * @param encodedToken
 * @returns decodedToken
 */
function decodeToken(encodedToken) {
    let decodedToken;
    if (encodedToken) {
        try {
            decodedToken = jwt_decode(encodedToken);
        } catch(error) {
            console.log(error);
        }
    }
    return decodedToken;
}
/**
 * Invokes logout for the the user and clears all the tokens
 */
const logout = async () => {
    console.log("Logging User Out...")
    tokens = null;
    window.localStorage.clear();
    await authService.logout(true);
    const logoutUrl = OAUTH2_LOGOUT_ENDPOINT +
        "?client_id=" + OAUTH2_CLIENT_ID +
        "&logout_uri=" + OAUTH2_REDIRECT_URI;
    window.location.replace(logoutUrl);
}

/**
 * Checks for user authentication and only shows the App, if the user is Authenticated AND belongs to valid user groups.
 */
function AuthenticationWrapper() {
    const { authService } = useAuth();

    /**
     * Invokes login for the the user
     */
    const login = async () => authService.authorize();

    // If the user authentication is pending,show a Reset button to logout
    if (authService.isPending()) {
        return (<div align="center">
            <h4>Authenticating...</h4>
            <AuthButton onClick={() => {
                logout().then();
            }}>Reset</AuthButton>
        </div>);
    }

    // If user is not authenticated, then show the Login button
    if (!authService.isAuthenticated()) {
        return (
            <div align="center">
                <h4>User Not Logged-in</h4>
                <AuthButton onClick={login}>Login with Cognito</AuthButton>
            </div>
        );
    }

    // If user is authenticated, then read tokens from the authService
    let accessToken = authService.getAuthTokens().access_token;
    let idToken = authService.getAuthTokens().id_token;
    let refreshToken = authService.getAuthTokens().refresh_token;

    tokens = accessToken === null ? null : {
        accessToken,
        idToken,
        refreshToken
    };

    // Get logged in username, email and user groups
    let accessTokenDecoded = decodeToken(tokens.accessToken);
    let idTokenDecoded = decodeToken(tokens.idToken);

    if (!((accessTokenDecoded) && (idTokenDecoded))) {
        logout().then();
    }

    loggedInUserName = accessTokenDecoded.username;
    const loggedInUserEmail = idTokenDecoded.email;
    //const logoutLabel = "Logout : " + loggedInUserName;

    let userGroups = "No User Groups";
    if (accessTokenDecoded["cognito:groups"] != null) {
         userGroups = accessTokenDecoded["cognito:groups"].toString();
    }

    // Check if the access token has the user groups required to access the App
    if (!hasUserGroup(accessToken, APP_VIEWER_GROUP_NAME) && !hasUserGroup(accessToken, APP_ADMIN_GROUP_NAME)) {
        return (
            <div align="center">
                <h4>  User {loggedInUserName} ({loggedInUserEmail}) is not authorized to access this application.</h4>
                <h4>  Please check your user groups [{userGroups}].</h4>
                <h4>  Contact {UNITY_ADMIN_EMAIL} to add your user name to relevant user groups.</h4>
                <AuthButton onClick={logout}>Logout</AuthButton>
            </div>
        );
    }

    // Clear token variables variable after use (to minimize the number of variables containing auth related values)
    accessTokenDecoded = "";
    idTokenDecoded = "";
    accessToken = "";
    idToken = "";
    refreshToken = "";

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
}

/**
 * Returns the tokens.
 */
export const getTokens = () => tokens;

/**
 * Returns the username.
 */
export const getUsername = () => loggedInUserName;

/**
 * AuthenticationWrapper wrapped by the AuthProviderWrapper.
 */
const AuthProviderWrapper = () => {
    return (
        <AuthProvider authService={authService} >
            <AuthenticationWrapper />
        </AuthProvider>
    );
}

export default AuthProviderWrapper;
export { logout };
