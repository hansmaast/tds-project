import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect } from 'react';
import { addOutline, logOutOutline, map } from 'ionicons/icons';
import { useSubscription } from '@apollo/client';
import { useAuth } from 'react-nhost';
import { useHistory } from 'react-router';
import HHCard from '../components/posts/HHCard';
import { IHikeList } from '../interfaces/Post/IHikeList';
import SUBSCRIBE_HIKES from '../utils/graphql/subscriptions';
import { APP_NAME } from '../utils/constants/strings';
import { IHike } from '../interfaces/Post/IHike';
import { useAuthentication } from '../utils/hooks/useAuthetication';

export const HomePage = () => {
  const history = useHistory();
  const { signedIn } = useAuth();
  const { authMethods: { logout } } = useAuthentication();
  const { loading, data, error } = useSubscription<IHikeList>(SUBSCRIBE_HIKES, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/new-post">
              <IonIcon icon={addOutline} size="medium" />
            </IonButton>
          </IonButtons>
          <IonTitle>
            { APP_NAME }
          </IonTitle>
          <IonButtons slot="end">
            { signedIn
              ? (
                <IonButton onClick={() => logout()}>
                  <IonIcon icon={logOutOutline} size="medium" />
                </IonButton>
              ) : (
                <IonButton onClick={() => history.push('/map')}>
                  <IonIcon icon={map} size="medium" />
                </IonButton>
              )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
            loading && <IonProgressBar type="indeterminate" />
          }
        {
            data?.hikes.map((hike: IHike) => <HHCard key={hike.id} hike={hike} />)
          }
      </IonContent>
    </IonPage>
  );
};
