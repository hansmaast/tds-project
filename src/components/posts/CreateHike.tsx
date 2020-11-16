import React, { useState } from 'react';
import {
  IonCard, IonIcon, IonInput, IonItem, IonLabel, IonProgressBar, IonTextarea, IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { addOutline, cameraOutline } from 'ionicons/icons';
import { usePhoto } from '../../utils/hooks/usePhoto';
import placeHolderPhoto from '../../assets/placeholder-image.png';
import { useDbInsert } from '../../utils/hooks/useDbInsert';
import { Button, RoundArrowButton } from '../style/Buttons';
import { SubTitle } from '../style/Text';
import { Flex } from '../style/Containers';
import { MapModal } from '../MapModal';
import { useNewHike } from '../../utils/hooks/useNewHike';

export const CreateHike = () => {
  const { newHike, setNewHike } = useNewHike();
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const { photo, triggerCamera } = usePhoto();
  const { startPostUpload, uploadProgress, uploadSuccess } = useDbInsert({ data: newHike, photo });
  const photoSrc = photo?.dataUrl ? photo.dataUrl : placeHolderPhoto;
  const history = useHistory();

  return (
    <>
      <IonProgressBar value={uploadProgress / 100} />
      <Flex column justifyContent="space-between">
        <IonItem lines="full">
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
            type="text"
            placeholder="Give your route a title.."
            value={newHike?.title}
            onIonChange={(e) => setNewHike({ ...newHike, title: e.detail.value! })}
          />
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Description</IonLabel>
          <IonTextarea
            placeholder="Tell us something about the route.."
            value={newHike.description}
            onIonChange={(e) => setNewHike({ ...newHike, description: e.detail.value! })}
          />
        </IonItem>

        <IonCard>
          <img src={photoSrc} alt="Camera" />
        </IonCard>

        <SubTitle>Press the camera icon to add a photo</SubTitle>
        <Button onClick={() => setShowMapModal(true)} margin="12pt" width="50%" alignSelf="center">Set starting point</Button>
      </Flex>

      <RoundArrowButton
        disabled={!photo}
        onClick={() => startPostUpload()}
        style={{ position: 'absolute', bottom: 20, left: 20 }}
      >
        {/* isAuthenticating */}
        {/* ? <IonSpinner name="crescent" /> */}
        <IonIcon icon={addOutline} />
      </RoundArrowButton>

      <RoundArrowButton
        onClick={() => triggerCamera()}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      >
        <IonIcon icon={cameraOutline} />
      </RoundArrowButton>

      <MapModal showMapModal={showMapModal} setShowMapModal={setShowMapModal} />

      <IonToast
        isOpen={uploadSuccess}
        message="Your image has been saved."
      />
    </>
  );
};
