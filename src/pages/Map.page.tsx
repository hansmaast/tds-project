import React, { useEffect, useRef, useState } from 'react';
import {
  IonButton, IonContent, IonLoading, IonPage,
} from '@ionic/react';
import mapboxgl from 'mapbox-gl';
import BackButtonHeader from '../components/headers/BackButtonHeader';
import { MapContainer } from '../style/Containers';
import { MAPBOX_ACCESS_TOKEN } from '../utils/constants/secrets';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMyPosition } from '../utils/hooks/useMyPosition';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_HIKES } from '../utils/graphql/subscriptions';
import { addStartingMarkers } from '../utils/map/addStartingMarkers';
import { addControls } from '../utils/map/addControls';
import { IHikeList } from '../interfaces/Post/IHikeList';

export const MapPage = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const { myPosition, tracker } = useMyPosition();
  const { loading: loadingHikes, data: hikeData, error } = useSubscription<IHikeList>(SUBSCRIBE_HIKES, {
    fetchPolicy: 'no-cache',
  });

  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new mapboxgl.Map({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [10.748503539483494, 59.92003719905571],
        zoom: 10,

      }));
    }
  }, [mapRef]);

  useEffect(() => {
    if (map) addControls({ to: map });
  }, [map]);

  useEffect(() => {
    if (myPosition.isLoading && !myPosition.data) {
      console.log('loading pos...');
    }
    if (map && hikeData) {
      map.resize();
      addStartingMarkers({ from: hikeData, to: map });
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
          )}
        <IonButton
          style={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translate(-50%, 0)',
          }}
          onClick={() => (tracker.isTracking ? tracker.stop() : tracker.start())}
        >
          { tracker.isTracking ? 'Stop ' : 'Start '}
          tracking
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
