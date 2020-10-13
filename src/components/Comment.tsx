import {
  IonAvatar, IonItem, IonLabel, IonTextarea,
} from '@ionic/react';
import React from 'react';
import IComment from '../interfaces/IComment';

interface Props {
  comment: IComment
}

const Comment: React.FC<Props> = ({ comment }) => (
  <IonItem>
    <IonAvatar slot="start">
      <img src="https://source.unsplash.com/random" alt="user" />
    </IonAvatar>
    <IonLabel>
      <p>{comment.user.display_name}</p>
      <IonTextarea readonly>{comment.text}</IonTextarea>
    </IonLabel>
  </IonItem>
);

export default Comment;
