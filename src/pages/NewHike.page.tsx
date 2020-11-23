// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonTextarea,
  IonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { addOutline, cameraOutline } from 'ionicons/icons';
import { usePhoto } from '../hooks/usePhoto';
import placeHolderPhoto from '../assets/placeholder-image.png';
import { useDbInsert } from '../hooks/useDbInsert';
import { StyledFabButton } from '../components/style/buttonStyle';
import { SubTitle } from '../components/style/textStyle';
import { IHikeInsert } from '../types';
import { ut_white } from '../components/style/constants';
import { MapModalContent } from '../components/MapModalContent';
import { ButtonWithAnimation } from '../components/ButtonWithAnimation';
import { FullScreenModal } from '../components/style/containerStyle';
import { auth } from '../utils/nhost';
import { HeaderWithLogoutAndPlusSign } from '../components/HeaderWithLogoutAndPlusSign';
import { YouNeedToLogin } from '../components/YouNeedToLogin';

const initialState: IHikeInsert = {
  coordinates: { data: undefined },
  description: '',
  length: 0,
  publicPhotoPath: '',
  title: '',
  user_id: '',
};

export const NewHike: React.FC = () => {
  const [newHike, setNewHike] = useState<IHikeInsert>(initialState);
  const { photo, triggerCamera } = usePhoto();
  const photoSrc = photo?.dataUrl ? photo.dataUrl : placeHolderPhoto;
  const { startPostUpload, uploadProgress, uploadSuccess } = useDbInsert({ data: newHike, photo });
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(true);

  useIonViewWillEnter(() => {
    console.log('is auth: ', auth.isAuthenticated());
    if (!auth.isAuthenticated()) {
      setShowLoginModal(true);
    }
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(newHike, null, 4));
  }, [newHike]);

  function disableUpload() {
    if (!newHike.coordinates.data
        || !newHike.title
        || !newHike.description
        || !photo) return true;
    return false;
  }

  return (
    <IonPage>
      <HeaderWithLogoutAndPlusSign />
      <IonContent>
        <IonProgressBar value={uploadProgress / 100} />
        {/* // Todo: convert this to styled component */ }
        <div style={{
          minHeight: 660,
          maxHeight: 1080,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
        >
          <div>
            { ' ' }
            {/* // Todo: refactor this to components */ }
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
          {/* // Todo: convert this to styled component */ }
          <div style={{
            maxWidth: 733,
            padding: 15,
            position: 'sticky',
            width: '100vw',
            display: 'flex',
            justifyContent: 'space-between',
            bottom: 0,
          }}
          >
            <StyledFabButton
              disabled={disableUpload()}
              onClick={() => startPostUpload()}
            >
              {/* isAuthenticating */ }
              {/* ? <IonSpinner name="crescent" /> */ }
              <IonIcon icon={addOutline} />
            </StyledFabButton>

            <StyledFabButton
              onClick={() => triggerCamera()}
            >
              <IonIcon icon={cameraOutline} />
            </StyledFabButton>
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
          message="Your hike has been saved."
        />

      </IonContent>
      <YouNeedToLogin open={showLoginModal} setShowLoginModal={setShowLoginModal} />
    </IonPage>
  );
};
