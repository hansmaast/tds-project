import React, { useEffect, useRef } from 'react';
import {
  IonButton, IonContent, IonLoading, IonPage,
} from '@ionic/react';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_HIKES } from '../graphql/subscriptions';
import { useMapInstance } from '../hooks/useMapInstance';
import { useMyPosition } from '../hooks/useMyPosition';
import { addStartingMarkers } from '../utils/map';
import { MapContainer } from '../style/Containers';
import BackButtonHeader from '../components/BackButtonHeader';
import { IHikeList } from '../types';

export const MapPage = () => {
  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const { map } = useMapInstance({ in: mapRef });
  const { myPosition, tracker } = useMyPosition();
  const { loading: loadingHikes, data: hikeData } = useSubscription<IHikeList>(SUBSCRIBE_HIKES, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (myPosition.isLoading && !myPosition.data) {
      console.log('loading pos...');
    }
    if (map.instance && hikeData) {
      addStartingMarkers({ from: hikeData, to: map.instance! });
    }
  }, [hikeData]);

  return (
    <IonPage>
      <BackButtonHeader defaultHref="/home" title="Hike Map" />
      <IonContent fullscreen>
        <MapContainer ref={mapRef} />
        { loadingHikes
          && (
          <IonLoading
            isOpen
            message="Loading routes 🎒🌲🍂..."
          />
          ) }
        <IonButton
          style={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translate(-50%, 0)',
          }}
          onClick={() => (tracker.isTracking ? tracker.stop() : tracker.start())}
        >
          { tracker.isTracking ? 'Stop ' : 'Start ' }
          tracking
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
