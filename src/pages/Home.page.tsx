import { IonContent, IonPage, IonProgressBar } from '@ionic/react';
import React, { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { useHistory } from 'react-router';
import HikeCard from '../components/HikeCard';
import { SUBSCRIBE_HIKES } from '../graphql/subscriptions';
import { IHike, IHikeList } from '../types';
import { Flex } from '../components/style/containerStyle';
import { HeaderWithLogoutAndPlusSign } from '../components/HeaderWithLogoutAndPlusSign';

export const Home = () => {
  const history = useHistory();
  const { loading, data, error } = useSubscription<IHikeList>(SUBSCRIBE_HIKES, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <IonPage>
      <HeaderWithLogoutAndPlusSign />
      <IonContent fullscreen>
        <Flex direction="column" alignItems="center">
          {
              loading && <IonProgressBar type="indeterminate" />
            }
          {
              data?.hikes.map((hike: IHike) => (
                <HikeCard
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
