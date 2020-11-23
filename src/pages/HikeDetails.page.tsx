// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import { IonContent, IonLoading, IonPage } from '@ionic/react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { IHike } from '../types';
import { auth, storage } from '../utils/nhost';
import { DELETE_POST } from '../graphql/mutations';
import { PUBLIC_STORAGE_DIR } from '../utils/constants/urls';
import { GET_HIKE_BY_ID } from '../graphql/queries';
import { getPhotoUrl } from '../utils/helpers';
import { ButtonWithAnimation } from '../components/ButtonWithAnimation';
import { HeaderWithLogoutAndPlusSign } from '../components/HeaderWithLogoutAndPlusSign';
import { Flex } from '../components/style/containerStyle';

export const HikeDetails = () => {
  const { id } = useParams();
  const [hike, setHike] = useState<IHike>();
  const [deletePostMutation] = useMutation(DELETE_POST);
  const { loading, data, error } = useQuery(GET_HIKE_BY_ID, { variables: { id } });

  // if (!post) {
  //   return null;
  // }

  async function deletePost(id: number) {
    if (hike) {
      console.log(auth.getClaim('x-hasura-user-id'));
      console.log(hike.user.id);
      alert(`Delete ${id}`);
      try {
        await deletePostMutation({ variables: { id } });
        await storage.delete(`${PUBLIC_STORAGE_DIR}${hike.publicPhotoPath}`);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.warn('There is no hike to delete.');
    }
  }

  useEffect(() => {
    console.log(typeof id, id);
    console.log('Loading: ', loading);
    console.log('Data: ', JSON.stringify(data, null, 4));
    console.log('Error: ', error);
  }, [loading]);

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
                style={{
                  width: '100%',
                  height: '50%',
                  maxWidth: 1100,
                  maxHeight: 600,
                  objectFit: 'cover',
                }}
              />
              {/* <HHCard hike={hike} /> */}
              <h3>{hike.title}</h3>
              <p>

                {
                  `Length: 
                 ${(hike.length / 1000).toFixed(3)} 
                 km`
                }

              </p>
              <p>{hike.description}</p>
              <ButtonWithAnimation text="View in map" linkTo={`/map/${hike!.id}`} />
            </>
            )}
        </Flex>
      </IonContent>
    </IonPage>
  );
};
