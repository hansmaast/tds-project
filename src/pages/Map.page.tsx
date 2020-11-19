import React, { useEffect, useRef } from 'react';
import {
  IonButton, IonContent, IonLoading, IonPage,
} from '@ionic/react';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_HIKES } from '../utils/graphql/subscriptions';
import { useMapInstance } from '../utils/hooks/useMapInstance';
import { useMyPosition } from '../utils/hooks/useMyPosition';
import { IHikeList } from '../interfaces/Post/IHikeList';
import { addStartingMarkers } from '../utils/map/addStartingMarkers';
import { MapContainer } from '../style/Containers';
import BackButtonHeader from '../components/headers/BackButtonHeader';

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
