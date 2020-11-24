import { IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, } from '@ionic/react';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { mapOutline } from 'ionicons/icons';
import { IHike } from '../types';
import { Card, CardImage } from './style/cards';
import { getPhotoUrl } from '../utils/helpers';
import { Flex } from './style/containers';
import { StyledIcon } from "./style/icons";

interface Props {
  hike: IHike
  onClick?: () => void
}

export const HikeCard: React.FC<Props> = ({ hike, onClick }) => {
  const history = useHistory();
  const { display_name } = hike.user;
  const km = (hike.length / 1000).toFixed(3);

  // using this ref to check if we're clicking map  icon or not
  const mapIconRef = useRef(null);

  // eslint-disable-next-line no-undef
  const handleOnClick = (e: React.MouseEvent<HTMLIonCardElement, MouseEvent>) => {
    // if target === mapIcon, go to map, not details
    if (mapIconRef.current === e.target) {
      history.push(`/map/${(hike.id)}`);
      return;
    }
    onClick!();
  };

  return (
    <Card marginX="10px" onClick={(e) => handleOnClick(e)}>
      <CardImage src={getPhotoUrl({ from: hike.publicPhotoPath })} alt="post" />
      <IonCardHeader>
        <IonCardSubtitle>
          {`@ ${display_name}`}
        </IonCardSubtitle>
        <IonCardTitle>
          { hike.title }
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <Flex justifyContent="space-between" alignItems="center">
          <p>
            { `Length: ${km} km` }
          </p>
          <StyledIcon ref={mapIconRef} icon={mapOutline} size="60" />
        </Flex>
      </IonCardContent>
    </Card>
  );
};
