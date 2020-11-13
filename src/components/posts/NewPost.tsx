import React, { useState } from 'react';
import {
  IonButton, IonCard, IonInput, IonItem, IonLabel, IonProgressBar, IonTextarea, IonToast,
} from '@ionic/react';
import { usePhoto } from '../../utils/hooks/usePhoto';
import placeHolderPhoto from '../../assets/placeholder-image.png';
import { IInsertPost } from '../../interfaces/Post/IInsertPost';
import { useNewPostUpload } from '../../utils/hooks/useNewPostUpload';

export const NewPost = () => {
  const [postData, setPostData] = useState<IInsertPost>({
    description: '', title: '',
  });
  const { photo, triggerCamera } = usePhoto();
  const { startPostUpload, uploadProgress, uploadSuccess } = useNewPostUpload({ postData, photo });
  const photoSrc = photo?.dataUrl ? photo.dataUrl : placeHolderPhoto;

  return (
    <>
      <IonProgressBar value={uploadProgress / 100} />
      <IonCard>
        <img src={photoSrc} alt="Camera" />
        <IonButton onClick={() => triggerCamera()}>New photo</IonButton>
      </IonCard>

      <IonItem lines="none">
        <IonLabel position="floating">Title</IonLabel>
        <IonInput
          type="text"
          placeholder="Title"
          value={postData.title}
          onIonChange={(e) => setPostData({ ...postData, title: e.detail.value! })}
        />
      </IonItem>

      <IonItem lines="none">
        <IonLabel position="floating">Description</IonLabel>
        <IonTextarea
          placeholder="Enter more information here..."
          value={postData.description}
          onIonChange={(e) => setPostData({ ...postData, description: e.detail.value! })}
        />
      </IonItem>

      <IonButton
        disabled={!photo}
        onClick={() => startPostUpload()}
      >
        Add Post!
      </IonButton>

      <IonToast
        isOpen={uploadSuccess}
        message="Your image has been saved."
      />
    </>
  );
};
