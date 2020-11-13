import {
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
} from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../../interfaces/Post/IPost';
import { PUBLIC_STORAGE } from '../../utils/constants/urls';

interface Props {
  post: IPost
}

const PostCard: React.FC<Props> = ({ post }) => {
  const {
    id, user, title, description, publicPhotoPath,
  } = post;
  const { display_name } = user;

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={{
        pathname: `details/${id}`,
        state: {
          post,
        },
      }}
    >
      <IonCard>
        <img src={PUBLIC_STORAGE + publicPhotoPath} alt="post" />
        <IonCardHeader>
          <IonCardSubtitle>
            @
            {' '}
            {display_name}
          </IonCardSubtitle>
          <IonCardTitle>
            {title}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {description}
        </IonCardContent>
      </IonCard>
    </Link>
  );
};

export default PostCard;
