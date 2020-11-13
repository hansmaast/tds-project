import React from 'react';
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import LoginPage from './pages/Login.page';
import PrivateRoute from './components/PrivateRoute';
import NewPostPage from './pages/NewPost.page';
import Home from './pages/Home.page';
import DetailPage from './pages/Detail.page';
import LandingPage from './pages/Landing.page';
import SignUpPage from './pages/SignUp.page';

const Router: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/login" component={LoginPage} exact />
    <Route path="/signup" component={SignUpPage} exact />
    <PrivateRoute path="/new-post" component={NewPostPage} exact />
    <Route path="/home" component={Home} exact />
    <Route path="/details/:id" component={DetailPage} exact />
    <Route path="/" component={LandingPage} exact />
  </IonRouterOutlet>
);

export default Router;
