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
import React from 'react';
import { addOutline, logOutOutline } from 'ionicons/icons';
import { useSubscription } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { IPostList } from '../interfaces/Post/IPostList';
import { auth } from '../utils/nhost';
import SUBSCRIBE_POSTS from '../graphql/subscriptions';

export default () => {
  const history = useHistory();
  const { loading, data } = useSubscription<IPostList>(SUBSCRIBE_POSTS, {
    fetchPolicy: 'no-cache',
  });
  const logout = async () => {
    try {
      await auth.logout();
      history.replace('/login');
    } catch (e) {
      console.error(e);
    }
  };

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
            TDSGram
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => logout()}>
              <IonIcon icon={logOutOutline} size="medium" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          loading && <IonProgressBar type="indeterminate" />
        }
        {
          data?.posts.map((post: any) => <PostCard key={post.id} post={post} />)
        }
      </IonContent>
    </IonPage>
  );
};
