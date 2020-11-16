// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { NewPost } from '../components/posts/NewPost';
import BackButtonHeader from '../components/headers/BackButtonHeader';

export const NewHike: React.FC = () => (
  <IonPage>
    <BackButtonHeader title="Create a hiking route 🏔" defaultHref="/home" />
    <IonContent>
      <NewPost />
    </IonContent>
  </IonPage>
);
