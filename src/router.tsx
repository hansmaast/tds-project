import React from 'react';
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import PrivateRoute from './components/PrivateRoute';
import * as pages from './pages';

const Router: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/login" component={pages.LoginPage} exact />
    <Route path="/signup" component={pages.SignUpPage} exact />
    <PrivateRoute path="/new-post" component={pages.NewPostPage} exact />
    <Route path="/home" component={pages.HomePage} exact />
    <Route path="/details/:id" component={pages.DetailPage} exact />
    <Route path="/map" component={pages.MapPage} exact />
    <Route path="/" component={pages.LandingPage} exact />
  </IonRouterOutlet>
);

export default Router;
