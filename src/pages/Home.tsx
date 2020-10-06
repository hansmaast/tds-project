import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import {addOutline} from "ionicons/icons";
import PostCard from "../components/PostCard";
import {useQuery} from "@apollo/client";
import {IPostList} from "../interfaces/IPostList";
import {GET_POSTS} from "../graphql/queries/queries";

export default () => {

  const {loading, data} = useQuery<IPostList>(GET_POSTS, {
    fetchPolicy: "no-cache"
  });

  if (loading) {
    return <IonLabel>Loading..</IonLabel>;
  }

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>TDSGram</IonTitle>
            <IonButtons slot={'end'}>
              <IonButton>
                <IonIcon icon={addOutline} size={'medium'}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {!data
              ? ("no data")
              : (data.posts.map((post: any) => <PostCard key={post.id} post={post}/>))
          }
        </IonContent>
      </IonPage>
  );
};