import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import React from 'react';
import routes from './routes';

export const RouterOutlet = (
  <IonRouterOutlet>
    {routes.map((route) => (
      <Route
        key={route.label}
        path={route.path}
        component={route.component}
        exact
      />
    ))}
    {/* <Route exact path="/" render={() => <Redirect to="/home"/>}/> */}
  </IonRouterOutlet>
);
