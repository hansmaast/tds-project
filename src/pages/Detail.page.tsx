// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import { useMutation } from '@apollo/client';
import HHCard from '../components/posts/HHCard';
import { IHike } from '../interfaces/Post/IHike';
import CommentsContainer from '../components/comments/CommentsContainer';
import { auth, storage } from '../utils/nhost';
import { DELETE_POST } from '../utils/graphql/mutations';
import { PUBLIC_STORAGE_DIR } from '../utils/constants/urls';
import { APP_NAME } from '../utils/constants/strings';

export const Detail: React.FC<any> = (props: any) => {
  const { location } = props;
  const post: IHike = location?.state?.post;
  const [deletePostMutation] = useMutation(DELETE_POST);

  if (!post) {
    return null;
  }

  async function deletePost(id: number) {
    console.log(auth.getClaim('x-hasura-user-id'));
    console.log(post.user.id);
    alert(`Delete ${id}`);
    try {
      await deletePostMutation({ variables: { id } });
      await storage.delete(`${PUBLIC_STORAGE_DIR}${post.publicPhotoPath}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{APP_NAME}</IonTitle>
          {
              auth.getClaim('x-hasura-user-id') === post.user.id
              && (
              <IonButtons slot="end">
                <IonButton onClick={() => deletePost(post.id!)}>
                  <IonIcon color="danger" icon={trashBinOutline} />
                </IonButton>
              </IonButtons>
              )
            }
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <HHCard hike={post} />
        <CommentsContainer postId={post.id!} />
      </IonContent>
    </IonPage>
  );
};
