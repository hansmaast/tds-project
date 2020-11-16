import React from 'react';
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import PrivateRoute from './components/PrivateRoute';
import * as pages from './pages';

const Router: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/login" component={pages.Login} exact />
    <Route path="/signup" component={pages.SignUp} exact />
    <PrivateRoute path="/new-post" component={pages.NewHike} exact />
    <Route path="/home" component={pages.Home} exact />
    <Route path="/details/:id" component={pages.Detail} exact />
    <Route path="/map" component={pages.MapPage} exact />
    <Route path="/" component={pages.Landing} exact />
  </IonRouterOutlet>
);

export default Router;
