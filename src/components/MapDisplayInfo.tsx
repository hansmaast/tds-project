import { IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';
import { getPhotoUrl } from '../utils/helpers';
import { Flex } from './style/containerStyle';
import { IDisplayInfo } from '../types';
import {
  DisplayInfoContainer,
  MapInfoCard,
  MapInfoCardImage,
  MapInfoCardImageContainer,
  MapInfoCardTextContainer,
  SmallCloseButton,
} from './style/MapDisplayInfoStyle';

interface Props {
  displayInfo: IDisplayInfo;
  onClick: () => void;
  setDisplayInfo: React.Dispatch<React.SetStateAction<IDisplayInfo>>;
}

export const MapDisplayInfo = (
  { displayInfo, onClick, setDisplayInfo }: Props,
) => {
  const { display, info } = displayInfo;
  const history = useHistory();
  if (!display) return null;
  return (
    <DisplayInfoContainer>
      <SmallCloseButton
        onClick={() => {
          onClick();
          setDisplayInfo({ info: null, display: false });
        }}
      >
        <IonIcon icon={closeOutline} />
      </SmallCloseButton>

      <MapInfoCard
        onClick={() => {
          history.replace(`/details/${info!.id}`);
        }}
      >
        <Flex direction="row" alignItems="center">
          <MapInfoCardTextContainer>
            <IonCardTitle>{ displayInfo.info?.title }</IonCardTitle>
            <IonCardSubtitle>
              Length:
              { ' ' }
              { (info!.length / 1000).toFixed(3) }
              { ' ' }
              km
            </IonCardSubtitle>
          </MapInfoCardTextContainer>
          <MapInfoCardImageContainer>
            <MapInfoCardImage
              src={getPhotoUrl({ from: info!.publicPhotoPath })}
            />
          </MapInfoCardImageContainer>
        </Flex>
      </MapInfoCard>
    </DisplayInfoContainer>
  );
};
