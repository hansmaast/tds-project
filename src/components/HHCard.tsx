import {
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IHike } from '../types';
import { Card } from '../style/Card';
import { getPhotoUrl } from '../utils/helpers';

interface Props {
  hike: IHike
  onClick?: () => void
}

const HHCard: React.FC<Props> = ({ hike, onClick }) => {
  const history = useHistory();
  const {
    id, user, title, description, publicPhotoPath, length: meters,
  } = hike;
  const { display_name } = user;
  const km = (meters / 1000).toFixed(3);

  return (
    <Card onClick={onClick}>
      <img src={getPhotoUrl({ from: publicPhotoPath })} alt="post" />
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
        <p>
          {`Length: ${km} km`}
        </p>
        {description}
      </IonCardContent>
    </Card>
  );
};

export default HHCard;
