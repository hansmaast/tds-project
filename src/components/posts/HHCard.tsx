import {
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
} from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IHike } from '../../interfaces/Post/IHike';
import { PUBLIC_STORAGE } from '../../utils/constants/urls';

interface Props {
  hike: IHike
}

const HHCard: React.FC<Props> = ({ hike }) => {
  const {
    id, user, title, description, publicPhotoPath, length, start_point, end_point,
  } = hike;
  const { display_name } = user;

  console.log(start_point);

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={{
        pathname: `details/${id}`,
        state: {
          hike,
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

export default HHCard;
