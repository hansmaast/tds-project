import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React, {useEffect} from 'react';
import PostCard from "../components/PostCard";
import {IPost} from "../interfaces/IPost";
import CommentsContainer from "../containers/CommentsContainer";


const Detail: React.FC<any> = (props: any) => {

  const post: IPost = props.location?.state?.post;

  if (!post) {
    return null
  }

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot={"start"}>
              <IonBackButton/>
            </IonButtons>
            <IonTitle>TDSGram</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <PostCard post={post}/>
          <CommentsContainer postId={post.id!}/>
        </IonContent>
      </IonPage>
  );
};

export default Detail;