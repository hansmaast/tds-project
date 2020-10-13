import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import NewPostPage from './pages/NewPostPage';
import Home from './pages/HomePage';
import DetailPage from './pages/DetailPage';

const Router: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/login" component={LoginPage} exact />
    <PrivateRoute path="/new-post" component={NewPostPage} exact />
    <Route path="/home" component={Home} exact />
    <Route path="/details/:id" component={DetailPage} exact />
    <Route exact path="/" render={() => <Redirect to="/login" />} />
  </IonRouterOutlet>
);

export default Router;
