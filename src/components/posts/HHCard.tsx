import {
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem,
} from '@ionic/react';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IHike } from '../../interfaces/Post/IHike';
import { PUBLIC_STORAGE } from '../../utils/constants/urls';
import { Card } from '../../style/Card';
import { getPhotoUrl } from '../../utils/helpers';

interface Props {
  hike: IHike
  onClick?: () => void
}

const HHCard: React.FC<Props> = ({ hike, onClick }) => {
  const history = useHistory();
  const {
    id, user, title, description, publicPhotoPath, length, start_point, end_point,
  } = hike;
  const { display_name } = user;

  console.log(start_point);

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
          {`Length: ${length} km`}
        </p>
        {description}
      </IonCardContent>
    </Card>
  );
};

export default HHCard;
