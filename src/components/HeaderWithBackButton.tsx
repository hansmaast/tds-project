import React from 'react';
import {
  IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar,
} from '@ionic/react';

interface BackButtonHeaderProps {
  defaultHref: string;
  title: string;
}

const HeaderWithBackButton: React.FC<BackButtonHeaderProps> = ({ title, defaultHref }) => (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={defaultHref} />
      </IonButtons>
      <IonTitle>
        { title }
      </IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default HeaderWithBackButton;
