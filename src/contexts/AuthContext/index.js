import React, {useCallback, useEffect, useMemo, useReducer} from 'react';

import PropTypes from 'prop-types';

import {
  removeAuthenticationToken,
  retrieveAuthenticationToken,
  storeAuthenticationToken,
} from '../../services/securityService';
import {useAccount, useLogin} from '../../services/userService';
import axios from 'axios';
import {logAxiosError} from '../../config/axios';

const LOGGING_IN = 'LOGGING_IN';
const LOGGED_IN = 'LOGGED_IN';
const ERROR_LOGGING_IN = 'ERROR_LOGGING_IN';
const LOGGED_OUT = 'LOGGED_OUT';
const RETRIEVED_USER_ACCOUNT = 'RETRIEVED_USER_ACCOUNT';
const ERROR_RETRIEVING_USER_ACCOUNT = 'ERROR_RETRIEVING_USER_ACCOUNT';

const AuthContext = React.createContext(null);

const authReducer = (prevState, {type, account, error}) => {
  switch (type) {
    case LOGGING_IN:
      return {
        ...prevState,
        isLogining: true,
        loginError: null,
      };
    case LOGGED_IN:
      return {
        ...prevState,
        isAuthenticated: true,
        // isLoading when we are checking authentication
        isLoading: false,
        // isLogining when we are currently calling the login method
        isLogining: false,
        hasLoginError: false,
        loginError: null,
      };
    case ERROR_LOGGING_IN:
      return {
        ...prevState,
        isAuthenticated: false,
        isLoading: false,
        isLogining: false,
        hasLoginError: true,
        loginError: error,
      };
    case LOGGED_OUT:
      return {
        ...prevState,
        isAuthenticated: false,
        isLoading: false,
        isLogining: false,
        account: null,
        hasErrorRetrievingUserAccount: false,
      };
    case RETRIEVED_USER_ACCOUNT:
      return {
        ...prevState,
        account,
        hasErrorRetrievingUserAccount: false,
      };
    case ERROR_RETRIEVING_USER_ACCOUNT:
      return {
        ...prevState,
        hasErrorRetrievingUserAccount: true,
      };
    default:
      console.error('Unknown operation in authReducer', type);
  }
};

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    isLogining: false,
    isLoading: true,
    hasLoginError: false,
    account: null,
    hasErrorRetrievingUserAccount: false,
  });

  const {
    refetch: fetchUserAccount,
    isLoading: isRetrievingUserAccount,
  } = useAccount({
    enabled: false,
    onSuccess: async (account) => {
      dispatch({type: RETRIEVED_USER_ACCOUNT, account});
    },
    onError: (err) => {
      dispatch({type: ERROR_RETRIEVING_USER_ACCOUNT});
      logout();
      console.error('Error when retrieving user account', err);
    },
  });

  const {mutate: loginUser} = useLogin({
    onSuccess: async ({id_token: token}) => {
      await storeAuthenticationToken(token);
      dispatch({type: LOGGED_IN});
      console.debug('User successfully logged in');
      fetchUserAccount(); // When the user authenticates, we'll fetch his account
    },
    onError: (error) => {
      dispatch({type: ERROR_LOGGING_IN, error});
    },
  });

  const checkAuthentication = useCallback(async () => {
    dispatch({type: LOGGING_IN});
    const token = await retrieveAuthenticationToken();
    if (token) {
      fetchUserAccount(); // if the user is effectively authenticated, we'll fetch the user account
      dispatch({type: LOGGED_IN});
    } else {
      dispatch({type: LOGGED_OUT});
    }
  }, [fetchUserAccount]);

  const logout = useCallback(() => {
    removeAuthenticationToken();
    dispatch({type: LOGGED_OUT});
  }, []);

  const authContext = useMemo(
    () => ({
      login: (values) => {
        dispatch({type: LOGGING_IN});
        loginUser(values);
      },
      isLogining: state.isLogining,
      hasLoginError: state.hasLoginError,
      loginError: state.loginError,
      logout,
      checkAuthentication,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      fetchUserAccount,
      isRetrievingUserAccount,
      hasErrorRetrievingUserAccount: state.hasErrorRetrievingUserAccount,
      account: state.account,
    }),
    [
      loginUser,
      logout,
      state.isAuthenticated,
      state.isLoading,
      state.isLogining,
      state.hasLoginError,
      state.loginError,
      checkAuthentication,
      fetchUserAccount,
      isRetrievingUserAccount,
      state.hasErrorRetrievingUserAccount,
      state.account,
    ],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuthentication = () => React.useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
