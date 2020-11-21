import React, { useEffect, useRef, useState } from 'react';
import {
  IonButton, IonFabButton, IonIcon, IonLoading,
} from '@ionic/react';
import { arrowUndoCircleOutline } from 'ionicons/icons';
import { MapContainer } from '../style/Containers';
import { helperStrings } from '../utils/map';
import { useMapInstance } from '../hooks/useMapInstance';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { IHelperString, IHikeInsert } from '../types';
import { getIdbCoords } from '../utils/map/transformers';

interface MapModalProps {
  newHike: IHikeInsert;
  setNewHike: React.Dispatch<React.SetStateAction<IHikeInsert>>;
  setShowMapModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapModalContent = ({
  newHike, setNewHike, setShowMapModal,
}: MapModalProps) => {
  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const { map } = useMapInstance({ in: mapRef });
  const {
    markers: { coordinates, undoLast },
    totalDistanceInMeters,
  } = useMapMarkers({ on: map.instance });
  const { length: coordinateArrayLength } = coordinates;

  const [mapTranslateX, setMapTranslateX] = useState<string>('100%');
  const [animationDuration] = useState(150);
  const [helperString, setHelperString] = useState<IHelperString>(helperStrings[0]);

  useEffect(() => {
    // animates map into view
    translateMap({ to: '0%', after: animationDuration * 6 });
  },
  []); // eslint-disable react-hooks/exhaustive-deps

  function translateMap({ to: translateX, after: ms }: { to: string, after: number }) {
    setTimeout(() => {
      setMapTranslateX(translateX);
    }, ms);
  }

  const handleButtonTap = () => {
    if (coordinateArrayLength > 1) {
      setNewHike({
        ...newHike,
        length: totalDistanceInMeters,
        coordinates: { data: getIdbCoords({ from: coordinates }) },
      });
      setShowMapModal(false);
    } else {
      setHelperString(helperStrings[1]);
      console.warn('Check your coords!!', coordinates);
    }
  };

  return (
    <>
      <MapContainer
        ref={mapRef}
        animate={{ x: mapTranslateX }}
        transition={{
          duration: animationDuration / 1000,
          ease: 'easeOut',
        }}
      />
      <IonLoading showBackdrop={false} isOpen={mapTranslateX !== '0%'} />
      <p style={{ margin: '1em auto 1em auto' }}>{ helperString.sentence }</p>
      <IonFabButton onClick={undoLast}>
        <IonIcon icon={arrowUndoCircleOutline} />
      </IonFabButton>
      <IonButton onClick={handleButtonTap}>{ helperString.button }</IonButton>
    </>
  );
};
