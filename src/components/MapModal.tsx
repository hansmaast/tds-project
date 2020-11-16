import { IonButton, IonModal } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '../utils/constants/secrets';
import { Map } from './style/Containers';
import { addControls } from '../utils/map/addControls';
import { getPointString } from '../utils/helpers';

interface MapModalProps {
  showMapModal: boolean;
  setShowMapModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapComponent = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const marker = new mapboxgl.Marker();

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
    map?.resize();
    if (map) {
      console.log('Map init!');
      addControls({ to: map });

      map.on('click', (e) => {
        map.resize();

        marker
          .setLngLat(e.lngLat)
          .addTo(map);
        console.log(e.lngLat);
        const pointString = getPointString({ from: e.lngLat });
        console.log(pointString);
        // setNewHike({ ...newHike, start_point: `(${e.lngLat.lng},${e.lngLat.lat})` });
      });
    }
  }, [map]);

  useEffect(() => {
    console.log('Modal mounted!');
    setTimeout(() => {
      map?.resize();
    }, 1500);
  }, []);

  return (
    <Map ref={mapRef} />
  );
};

export const MapModal = ({ showMapModal, setShowMapModal }: MapModalProps) => (
  <IonModal isOpen={showMapModal}>
    <MapComponent />
    <IonButton onClick={() => setShowMapModal(false)}>Done</IonButton>
  </IonModal>
);
