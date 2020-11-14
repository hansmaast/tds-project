import React, { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import {
  IonCard, IonCardContent, IonContent, IonPage, useIonViewWillEnter,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import BackButtonHeader from '../components/headers/BackButtonHeader';
import { MAPBOX_ACCESS_TOKEN } from '../utils/constants/secrets';
import 'mapbox-gl/dist/mapbox-gl.css';

const MarkerPopUp: React.FC = () => (
  <IonCard>
    <IonCardContent>
      <h1>Hello World</h1>
    </IonCardContent>
  </IonCard>
);

const myPopUp = new mapboxgl.Popup().setHTML(renderToString(<MarkerPopUp />));

const addMapControls = (toMap: mapboxgl.Map) => {
  // add navigation control (the +/- zoom buttons)
  toMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

  toMap.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  }));
};

export const MapPage = () => {
  const history = useHistory();

  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  let map: mapboxgl.Map | null = null;

  useEffect(() => {
    if (mapRef.current) {
      map = new mapboxgl.Map({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [10.748503539483494, 59.92003719905571],
        zoom: 10,

      });
    }
    return () => {
      map!.remove();
    };
  }, [mapRef]);

  useIonViewWillEnter(() => {
    map!.resize();
  }, []);

  useEffect(() => {
    if (map) {
      const marker = new mapboxgl.Marker()
        .setLngLat([10.748503539483494, 59.92003719905571])
        .setPopup(myPopUp)
        .addTo(map);

      addMapControls(map);

      map.on('click', (e) => {
        marker.setLngLat(e.lngLat);
        console.log(`A click event has occurred at ${e.lngLat}`);
      });
    }

    console.log(map);
  }, [map]);

  return (
    <IonPage>
      <BackButtonHeader defaultHref="/home" title="Hike Map" />
      <IonContent fullscreen>
        <div
          style={{ width: '100%', height: '100vh' }}
          ref={mapRef}
        />
      </IonContent>
    </IonPage>
  );
};
