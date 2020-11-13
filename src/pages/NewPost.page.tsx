// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { NewPost } from '../components/posts/NewPost';

const NewPostPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle> New post</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <NewPost />
    </IonContent>
  </IonPage>
);

export default NewPostPage;
