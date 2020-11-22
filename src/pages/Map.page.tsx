import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonLoading, IonPage } from '@ionic/react';
import { useSubscription } from '@apollo/client';
import { IDisplayInfo, IHikeList } from '../types';
import { SUBSCRIBE_HIKES } from '../graphql/subscriptions';
import { MapContainer } from '../style/containerStyle';
import { useMapInstance } from '../hooks/useMapInstance';
import { removeRouteLine } from '../utils/map/drawLine';
import { addHikeMarkers } from '../utils/map';
import { MapDisplayInfo } from '../components/MapDisplayInfo';
import BackButtonHeader from '../components/BackButtonHeader';

export const MapPage = () => {
  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const { map } = useMapInstance({ in: mapRef });
  const [displayInfo, setDisplayInfo] = useState<IDisplayInfo>({ display: false, info: null });
  const { loading: loadingHikes, data: hikeData } = useSubscription<IHikeList>(SUBSCRIBE_HIKES, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (map.instance && hikeData) {
      addHikeMarkers({ from: hikeData, to: map.instance!, setDisplayInfo });
    }
  }, [hikeData]);

  useEffect(() => {
    console.log(displayInfo);
  }, [displayInfo]);

  return (
    <IonPage>
      <BackButtonHeader defaultHref="/home" title="Hike Map" />
      <IonContent fullscreen>

        <MapContainer ref={mapRef}>
          <MapDisplayInfo
            displayInfo={displayInfo}
            setDisplayInfo={setDisplayInfo}
            onClick={() => {
              removeRouteLine({ from: map.instance! });
              setDisplayInfo({ display: false, info: null });
            }}
          />
        </MapContainer>
        { loadingHikes
          && (
          <IonLoading
            isOpen
            message="Loading routes 🎒🌲🍂..."
          />
          ) }
      </IonContent>
    </IonPage>
  );
};
