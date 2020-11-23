import { useAuth } from 'react-nhost';
import {
  IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar,
} from '@ionic/react';
import { addOutline, logOutOutline } from 'ionicons/icons';
import React from 'react';
import { useAuthentication } from '../hooks/useAuthetication';
import { paths } from '../navigation/paths';
import { APP_NAME } from '../utils/constants/strings';

export const HeaderWithLogoutAndPlusSign = () => {
  const { signedIn } = useAuth();
  const { authMethods: { logout } } = useAuthentication();

  if (!signedIn) {
    return (
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            { APP_NAME }
          </IonTitle>
        </IonToolbar>
      </IonHeader>
    );
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton routerLink={paths.newHike}>
            <IonIcon icon={addOutline} size="medium" />
          </IonButton>
        </IonButtons>
        <IonTitle>
          { APP_NAME }
        </IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => logout()}>
            <IonIcon icon={logOutOutline} size="medium" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
