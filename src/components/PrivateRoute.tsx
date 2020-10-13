import React from 'react';
import { useAuth } from 'react-nhost';
import { Redirect, Route } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute = ({ component, path, exact }: PrivateRouteProps) => {
  const { signedIn } = useAuth();
  return signedIn
    ? <Route component={component} exact={exact} path={path} />
    : <Redirect to="login" />;
};

export default PrivateRoute;
