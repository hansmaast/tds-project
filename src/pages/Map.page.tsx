import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonLoading, IonPage } from '@ionic/react';
import { useSubscription } from '@apollo/client';
import { useParams } from 'react-router';
import { IDisplayInfo, IHikeList } from '../types';
import { SUBSCRIBE_HIKES } from '../graphql/subscriptions';
import { MapContainer } from '../style/containerStyle';
import { useMapInstance } from '../hooks/useMapInstance';
import { drawRouteLine, removeRouteLine } from '../utils/map/drawLine';
import { addHikeMarkers, getBounds } from '../utils/map';
import { MapDisplayInfo } from '../components/MapDisplayInfo';
import BackButtonHeader from '../components/BackButtonHeader';
import { getLngLatCoords } from '../utils/map/transformers';

export const MapPage = () => {
  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const { map } = useMapInstance({ in: mapRef });
  const [displayInfo, setDisplayInfo] = useState<IDisplayInfo>({ display: false, info: null });
  const { loading: loadingHikes, data: hikeData } = useSubscription<IHikeList>(SUBSCRIBE_HIKES, {
    fetchPolicy: 'no-cache',
  });

  const { id } = useParams();

  useEffect(() => {
    if (map.instance && hikeData) {
      addHikeMarkers({ from: hikeData, to: map.instance!, setDisplayInfo });

      // zooms in on route if map renders with an id
      if (id) {
        if (id === 'all-routes') return;
        const hike = hikeData.hikes.find((h) => h.id === parseInt(id));
        const lngLat = getLngLatCoords({ from: hike!.coordinates });
        const bounds = getBounds({ from: lngLat });
        map.instance.fitBounds(bounds);
        drawRouteLine({ from: hike!, on: map.instance });
        setDisplayInfo({ display: true, info: hike! });
      }
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
