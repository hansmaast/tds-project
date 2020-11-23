import React, { useEffect, useRef, useState } from 'react';
import {
  IonContent, IonLoading, IonPage, useIonViewWillEnter,
} from '@ionic/react';
import { useSubscription } from '@apollo/client';
import { IDisplayInfo, IHikeList } from '../types';
import { SUBSCRIBE_HIKES } from '../graphql/subscriptions';
import { MapContainer } from '../components/style/containerStyle';
import { useMapInstance } from '../hooks/useMapInstance';
import { drawRouteLine, removeRouteLine } from '../utils/map/drawLine';
import { addHikeMarkers, getBounds } from '../utils/map';
import { MapDisplayInfo } from '../components/MapDisplayInfo';
import { getLngLatCoords } from '../utils/map/transformers';
import { HeaderWithLogoutAndPlusSign } from '../components/HeaderWithLogoutAndPlusSign';

export const MapPage = () => {
  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const { map } = useMapInstance({ in: mapRef });
  const [displayInfo, setDisplayInfo] = useState<IDisplayInfo>({ display: false, info: null });
  const { loading: loadingHikes, data: hikeData } = useSubscription<IHikeList>(SUBSCRIBE_HIKES, {
    fetchPolicy: 'no-cache',
  });

  const [id, setId] = useState<number>();

  useIonViewWillEnter(() => {
    // when navigating with tabs, the usePrams hook does not register a change in the url
    const idParam = window.location.pathname.split('/')[2];
    const idInt = parseInt(idParam);
    if (idInt) setId(idInt);
    console.log(window.location.pathname.split('/')[2]);

    // fore map to fit view
    if (map.instance) {
      map.instance.resize();
    }
  }, [map]);

  useEffect(() => {
    if (map.instance && hikeData) {
      addHikeMarkers({ from: hikeData, to: map.instance!, setDisplayInfo });

      // zooms in on route if map renders with an id
      if (id) {
        const hike = hikeData.hikes.find((h) => h.id === id);
        const lngLat = getLngLatCoords({ from: hike!.coordinates });
        const bounds = getBounds({ from: lngLat });
        map.instance.fitBounds(bounds);
        drawRouteLine({ from: hike!, on: map.instance });
        setDisplayInfo({ display: true, info: hike! });
      }
    }
  }, [hikeData, id]);  // eslint-disable-line

  useEffect(() => {
    console.log(displayInfo);
  }, [displayInfo]);

  return (
    <IonPage>
      <HeaderWithLogoutAndPlusSign />
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
