import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonProgressBar,
  IonTextarea,
  IonToast,
} from '@ionic/react';
import { addOutline, cameraOutline } from 'ionicons/icons';
import styled from 'styled-components';
import { usePhoto } from '../hooks/usePhoto';
import placeHolderPhoto from '../assets/placeholder-image.png';
import { useDbInsert } from '../hooks/useDbInsert';
import { RoundArrowButton } from '../style/buttonStyle';
import { SubTitle } from '../style/textStyle';
import { MapModalContent } from './MapModalContent';
import { IHikeInsert } from '../types';
import { ButtonWithAnimation } from './ButtonWithAnimation';
import { ut_white } from '../style/constants';

const initialState: IHikeInsert = {
  coordinates: { data: undefined },
  description: '',
  length: 0,
  publicPhotoPath: '',
  title: '',
  user_id: '',
};
export const CreateHike = () => {
  const [newHike, setNewHike] = useState<IHikeInsert>(initialState);
  const { photo, triggerCamera } = usePhoto();
  const photoSrc = photo?.dataUrl ? photo.dataUrl : placeHolderPhoto;
  const { startPostUpload, uploadProgress, uploadSuccess } = useDbInsert({ data: newHike, photo });
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  useEffect(() => {
    console.log(JSON.stringify(newHike, null, 4));
  }, [newHike]);

  return (
    <>
      <IonProgressBar value={uploadProgress / 100} />
      <div style={{
        minHeight: 660, maxHeight: 1080, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '100%', width: '100%',
      }}
      >
        <div>
          <IonItem lines="full" style={{ backgroundColor: ut_white, maxWidth: 500, width: '100vw' }}>
            <IonLabel position="floating">Title</IonLabel>
            <IonInput
              type="text"
              placeholder="Give your route a title.."
              value={newHike?.title}
              onIonChange={(e) => setNewHike({ ...newHike, title: e.detail.value! })}
            />
          </IonItem>

          <IonItem lines="full" style={{ maxWidth: 500, width: '100vw' }}>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea
              placeholder="Tell us something about the route.."
              value={newHike.description}
              onIonChange={(e) => setNewHike({ ...newHike, description: e.detail.value! })}
            />
          </IonItem>
        </div>

        <IonCard style={{ maxWidth: '500px' }}>
          <img src={photoSrc} alt="Camera" />
        </IonCard>

        <SubTitle>Press the camera icon to add a photo</SubTitle>
        <ButtonWithAnimation text="Mark your route" onClick={() => setShowMapModal(true)} />

        <div style={{
          maxWidth: 733, padding: 15, position: 'sticky', width: '100vw', display: 'flex', justifyContent: 'space-between', bottom: 0,
        }}
        >
          <RoundArrowButton
            disabled={!photo}
            onClick={() => startPostUpload()}
          >
            {/* isAuthenticating */ }
            {/* ? <IonSpinner name="crescent" /> */ }
            <IonIcon icon={addOutline} />
          </RoundArrowButton>

          <RoundArrowButton
            onClick={() => triggerCamera()}
          >
            <IonIcon icon={cameraOutline} />
          </RoundArrowButton>
        </div>
        <FullScreenModal isOpen={showMapModal}>
          <MapModalContent
            setShowMapModal={setShowMapModal}
            newHike={newHike}
            setNewHike={setNewHike}
          />
        </FullScreenModal>
      </div>
      <IonToast
        isOpen={uploadSuccess}
        message="Your image has been saved."
      />
    </>
  );
};

const FullScreenModal = styled(IonModal)`
--width: 100%;
--height: 100%;
--border-radius: 0;
`;
