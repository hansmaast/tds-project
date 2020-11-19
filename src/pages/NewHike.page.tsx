// eslint-disable-next-line no-use-before-define
import React from 'react';
import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import { CreateHike } from '../components/CreateHike';
import BackButtonHeader from '../components/BackButtonHeader';

export const NewHike: React.FC = () => (
  <IonPage>
    <BackButtonHeader title="Create a hiking route 🏔" defaultHref="/home" />
    <IonRouterOutlet />
    <IonContent>
      <CreateHike />
    </IonContent>
  </IonPage>
);
