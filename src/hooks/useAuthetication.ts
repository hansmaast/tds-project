import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../utils/nhost';
import { paths } from '../navigation/paths';
import { EMAIL_PASS_INCORRECT, EMAIL_PASS_OR_USER_EXISTS } from '../utils/constants/strings';

export const useAuthentication = () => {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>();

  const register = async ({ email, password }: { email: string, password: string }) => {
    setIsAuthenticating(true);
    try {
      await auth.register(email, password);
      history.replace(paths.home);
    } catch (e) {
      setAuthError(EMAIL_PASS_OR_USER_EXISTS);
      console.error(e);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const login = async ({ email, password }: { email: string, password: string }) => {
    setIsAuthenticating(true);
    try {
      await auth.login(email, password);
      history.replace(paths.home);
    } catch (e) {
      setAuthError(EMAIL_PASS_INCORRECT);
      console.error(e);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      history.replace(paths.login);
    } catch (e) {
      console.error(e);
    }
  };

  const authMethods = {
    logout,
    login,
    register,
  };

  return {
    authMethods, isAuthenticating, authError, setAuthError,
  };
};
