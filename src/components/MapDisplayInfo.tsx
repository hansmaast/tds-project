import {
  IonCard, IonCardSubtitle, IonCardTitle, IonIcon,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';
import { IDisplayInfo } from '../types';
import { Flex } from '../style/containerStyle';
import { getPhotoUrl } from '../utils/helpers';
import { ut_green } from '../style/constants';
import { RoundArrowButton } from '../style/buttonStyle';

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
    <div style={{
      margin: 15, cursor: 'pointer', overflow: 'visible', maxWidth: 300, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
    }}
    >
      <RoundArrowButton
        onClick={() => {
          onClick();
          setDisplayInfo({ info: null, display: false });
        }}
        style={{
          position: 'absolute', width: 25, height: 25, right: 0, top: 0, transform: 'translate(50%, -50%)', color: ut_green, zIndex: 10,
        }}
      >
        <IonIcon icon={closeOutline} />
      </RoundArrowButton>

      <IonCard
        onClick={() => {
          history.replace(`/details/${info!.id}`);
        }}
        style={{ padding: 15, margin: 0 }}
      >
        <Flex>
          <div>
            <IonCardTitle>{ displayInfo.info?.title }</IonCardTitle>
            <IonCardSubtitle>
              Length:
              { ' ' }
              { (info!.length / 1000).toFixed(3) }
              { ' ' }
              km
            </IonCardSubtitle>
          </div>
          <div style={{
            height: 75, width: 75, marginLeft: 15,
          }}
          >
            <img
              width="100%"
              height="100%"
              style={{ objectFit: 'cover', borderRadius: 4 }}
              src={getPhotoUrl({ from: info!.publicPhotoPath })}
            />
          </div>
        </Flex>
      </IonCard>
    </div>
  );
};
