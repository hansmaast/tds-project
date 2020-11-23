import {
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon,
} from '@ionic/react';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { mapOutline } from 'ionicons/icons';
import styled from 'styled-components';
import { IHike } from '../types';
import { Card, CardImage } from './style/cards';
import { getPhotoUrl } from '../utils/helpers';
import { Flex } from './style/containerStyle';
import {
  ut_black, ut_box_shadow, ut_green, ut_white,
} from './style/constants';

interface Props {
  hike: IHike
  onClick?: () => void
}

const HikeCard: React.FC<Props> = ({ hike, onClick }) => {
  const history = useHistory();
  const {
    id, user, title, publicPhotoPath, length: meters,
  } = hike;
  const { display_name } = user;
  const km = (meters / 1000).toFixed(3);

  const mapIconRef = useRef(null);

  const handleOnClick = (e: React.MouseEvent<HTMLIonCardElement, MouseEvent>) => {
    if (mapIconRef.current === e.target) {
      history.push(`/map/${id}`);
      return;
    }
    onClick!();
  };

  return (
    <Card
      marginX="10px"
      onClick={(e) => handleOnClick(e)}
    >
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
      <IonCardContent>
        <Flex justifyContent="space-between" alignItems="center">
          <p>
            { `Length: ${km} km` }
          </p>
          <StyledIcon
            ref={mapIconRef}
            onClick={() => {
            }}
            icon={mapOutline}
            size="60"
          />
        </Flex>
      </IonCardContent>
    </Card>
  );
};

const StyledIcon = styled(IonIcon)`
  background-color: ${ut_green};
  color: ${ut_white};
  padding: 4pt;
  font-size: 12pt;
  border-radius: 4px;
  box-shadow: ${ut_box_shadow};
  transition: background-color 300ms ease;

  :hover {
    background-color: ${ut_black};
  }
`;

export default HikeCard;
