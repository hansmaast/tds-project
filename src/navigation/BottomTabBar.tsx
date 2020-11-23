import {
  IonIcon, IonLabel, IonTabBar, IonTabButton, isPlatform,
} from '@ionic/react';
import React from 'react';
import routes from './routes';

const tabs = routes.filter((route) => route.tab);

export const BottomTabBar = (
  <IonTabBar slot={isPlatform('desktop') ? 'top' : 'bottom'}>
    {tabs.map((tab) => (
      <IonTabButton key={tab.label} tab={tab.label} href={tab.path}>
        <IonIcon icon={tab.icon} />
        <IonLabel>{tab.label}</IonLabel>
      </IonTabButton>
    ))}
  </IonTabBar>
);
