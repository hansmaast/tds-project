import {
  IonCard, IonCardSubtitle, IonCardTitle, IonFabButton, IonIcon,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { IDisplayInfo } from '../types';
import { Flex } from '../style/Containers';
import { getPhotoUrl } from '../utils/helpers';

export const MapDisplayInfo = (
  { displayInfo, onClick }: { displayInfo: IDisplayInfo, onClick: () => void },
) => {
  const { display, info } = displayInfo;
  if (!display) return null;
  return (
    <IonCard style={{ padding: 15, overflow: 'visible' }}>
      <IonFabButton
        onClick={onClick}
        style={{
          position: 'absolute', width: 25, height: 25, right: 0, bottom: 0, transform: 'translate(50%, 50%)',
        }}
      >
        <IonIcon icon={closeOutline} />
      </IonFabButton>
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
  );
};
