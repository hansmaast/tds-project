import React from 'react';
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import * as pages from './pages';
import { paths } from './utils/constants/paths';
import PrivateRoute from './components/PrivateRoute';

const Router: React.FC = () => (
  <IonRouterOutlet>
    <PrivateRoute path={paths.newHike} component={pages.NewHike} exact />
    <Route path={paths.map} component={pages.MapPage} exact />
    <Route path={paths.details} component={pages.HikeDetails} exact />
    <Route path={paths.home} component={pages.Home} exact />
    <Route path={paths.signUp} component={pages.SignUp} exact />
    <Route path={paths.login} component={pages.Login} exact />
    <Route path={paths.landing} component={pages.Landing} exact />
  </IonRouterOutlet>
);

export default Router;
