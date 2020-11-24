import React, { useEffect, useState } from 'react';
import { IonContent, IonLoading, IonPage } from '@ionic/react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { IHike } from '../types';
import { GET_HIKE_BY_ID } from '../graphql/queries';
import { getPhotoUrl } from '../utils/helpers';
import { ButtonWithAnimation } from '../components/ButtonWithAnimation';
import { HeaderWithLogoutAndPlusSign } from '../components/HeaderWithLogoutAndPlusSign';
import { Flex } from '../components/style/containers';

export const HikeDetails = () => {
  const { id } = useParams();
  const [hike, setHike] = useState<IHike>();
  const { loading, data } = useQuery(GET_HIKE_BY_ID, { variables: { id } });

  useEffect(() => {
    if (data) setHike(data.hikes[0]);
  }, [data]);

  return (
    <IonPage>
      <HeaderWithLogoutAndPlusSign />
      <IonContent fullscreen>
        <Flex noWrap fillParent direction="column" alignItems="center">
          <IonLoading isOpen={loading} />
          { hike && !loading
            && (
            <>
              <img
                src={getPhotoUrl({ from: hike.publicPhotoPath })}
                alt="hike"
                // Todo: refactor this to styled components
                style={{
                  width: '100%',
                  height: '50%',
                  maxWidth: 1100,
                  maxHeight: 600,
                  objectFit: 'cover',
                }}
              />
              <h3>{ hike.title }</h3>
              <p>
                {`Length: ${(hike.length / 1000).toFixed(3)} km`}
              </p>
              <p style={{ padding: '12pt' }}>{ hike.description }</p>
              <ButtonWithAnimation text="View in map" linkTo={`/map/${hike!.id}`} />
            </>
            )}
        </Flex>
      </IonContent>
    </IonPage>
  );
};
