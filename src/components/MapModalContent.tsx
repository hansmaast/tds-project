import React, { useEffect, useRef, useState } from 'react';
import { IonIcon, IonLoading } from '@ionic/react';
import { arrowUndoCircleOutline, closeOutline } from 'ionicons/icons';
import { MapContainer } from './style/containerStyle';
import { helperStrings } from '../utils/map';
import { useMapInstance } from '../hooks/useMapInstance';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { IHelperString, IHikeInsert } from '../types';
import { getIdbCoords } from '../utils/map/transformers';
import { ButtonWithAnimation } from './ButtonWithAnimation';
import { margin_y_10_pt, ut_white } from './style/constants';
import { StyledFabButton } from './style/buttonStyle';

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
  []); // eslint-disable-line

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
      <StyledFabButton
        onClick={() => { setShowMapModal(false); }}
        style={{
          position: 'absolute', top: 20, left: 20, margin: margin_y_10_pt,
        }}
      >
        <IonIcon icon={closeOutline} />
      </StyledFabButton>

      <StyledFabButton
        onClick={undoLast}
        style={{
          position: 'absolute', bottom: 20, right: 20, margin: margin_y_10_pt,
        }}
      >
        <IonIcon icon={arrowUndoCircleOutline} />
      </StyledFabButton>
      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <p style={{
          margin: '1em auto 1em auto', textAlign: 'center', backgroundColor: ut_white, padding: '5px 10px', borderRadius: 4,
        }}
        >
          { helperString.sentence }
        </p>
        <ButtonWithAnimation onClick={handleButtonTap} text={helperString.button} />
      </div>
    </>
  );
};
