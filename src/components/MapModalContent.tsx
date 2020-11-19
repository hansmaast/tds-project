import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonLoading } from '@ionic/react';
import { MapContainer } from '../style/Containers';
import { getPointString } from '../utils/helpers';
import { IHikeInsert } from '../interfaces/Post/IHikeInsert';
import { helperStrings, IHelperString } from '../utils/map/helperStrings';
import { useMapInstance } from '../utils/hooks/useMapInstance';
import { useMapMarkers } from '../utils/hooks/useMapMarkers';

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
  const { coords } = useMapMarkers({ on: map.instance });
  const [mapTranslateX, setMapTranslateX] = useState<string>('100%');
  const [animationDuration] = useState(150);
  const [helperString, setHelperString] = useState<IHelperString>(helperStrings[0]);

  function translateMap({ to: translateX, after: ms }: { to: string, after: number }) {
    setTimeout(() => {
      setMapTranslateX(translateX);
    }, ms);
  }

  useEffect(() => {
    // animates map into view
    translateMap({ to: '0%', after: animationDuration * 6 });
  },
  []); // eslint-disable react-hooks/exhaustive-deps

  const handleButtonTap = () => {
    if (coords.start && !coords.end && helperString.button !== 'Done') {
      translateMap({ to: '100%', after: 0 });
      // displays a new message to the user
      setHelperString(helperStrings[1]);
      setTimeout(() => {
        map.reInit();
        translateMap({ to: '0%', after: 0 });
      }, animationDuration);
    } else {
      console.warn('No start coords set!');
    }

    // sets parents state
    if (coords.start && coords.end) {
      setNewHike({
        ...newHike,
        start_point: getPointString({ from: coords.start }),
        end_point: getPointString({ from: coords.end }),
      });
      setShowMapModal(false);
    } else {
      console.warn('Some coords is null!', coords.start, coords.end);
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
      <IonButton onClick={handleButtonTap}>{ helperString.button }</IonButton>
    </>
  );
};
