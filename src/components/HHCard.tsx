import {
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IHike } from '../types';
import { Card, CardImage } from '../style/cards';
import { getPhotoUrl } from '../utils/helpers';
import { Flex } from '../style/containerStyle';

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
    <Card marginX="10px" onClick={onClick}>
      <CardImage src={getPhotoUrl({ from: publicPhotoPath })} alt="post" />
      <IonCardHeader>
        <IonCardSubtitle>
          @
          { ' ' }
          { display_name }
        </IonCardSubtitle>
        <IonCardTitle>
          { title }
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent style={{ minHeight: '100px' }}>
        <Flex justifyContent="flex-start">
          <p>
            { `Length: ${km} km` }
          </p>
        </Flex>
      </IonCardContent>
    </Card>
  );
};

export default HHCard;
