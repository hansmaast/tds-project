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
import HHCard from '../components/HHCard';
import { SUBSCRIBE_HIKES } from '../graphql/subscriptions';
import { APP_NAME } from '../utils/constants/strings';
import { IHike, IHikeList } from '../types';
import { useAuthentication } from '../hooks/useAuthetication';
import { paths } from '../utils/constants/paths';
import { Flex } from '../style/Containers';

export const Home = () => {
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
            <IonButton routerLink={paths.newHike}>
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
                <IonButton onClick={() => history.push(paths.map)}>
                  <IonIcon icon={map} size="medium" />
                </IonButton>
              )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Flex column alignItems="center">
          {
            loading && <IonProgressBar type="indeterminate" />
          }
          {
            data?.hikes.map((hike: IHike) => (
              <HHCard
                key={hike.id}
                hike={hike}
                onClick={() => history.push(`/details/${hike.id}`)}
              />
            ))
          }
        </Flex>
      </IonContent>
    </IonPage>
  );
};
