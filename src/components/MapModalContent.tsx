import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLat, MapboxOptions } from 'mapbox-gl';
import { IonButton, IonLoading } from '@ionic/react';
import { MAPBOX_ACCESS_TOKEN } from '../utils/constants/secrets';
import { MapContainer } from '../style/Containers';
import { addControls } from '../utils/map/addControls';
import { getPointString } from '../utils/helpers';
import { IHikeInsert } from '../interfaces/Post/IHikeInsert';
import { helperStrings, IHelperString } from '../utils/map/helperStrings';

interface MapModalProps {
  newHike: IHikeInsert;
  setNewHike: React.Dispatch<React.SetStateAction<IHikeInsert>>;
  setShowMapModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapModalContent = ({
  newHike, setNewHike, setShowMapModal,
}: MapModalProps) => {
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();
  const [mapOptions, setMapOptions] = useState<MapboxOptions>();
  const [startCoords, setStartCoords] = useState<LngLat>();
  const [endCoords, setEndCoords] = useState<LngLat>();

  const [startMarker] = useState(new mapboxgl.Marker());
  const [endMarker] = useState(new mapboxgl.Marker());
  const [startPointIsSet, setStartPointIsSet] = useState<boolean>(false);
  const [endPointIsSet, setEndPointIsSet] = useState<boolean>(false);

  const [helperString, setHelperString] = useState<IHelperString>(helperStrings[0]);
  const mapRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [mapTranslateX, setMapTranslateX] = useState<string>('100%');
  const [animationDuration] = useState(150);

  useEffect(() => {
    // animates map into view
    setTimeout(() => {
      setMapTranslateX('0%');
    }, animationDuration * 6);

    // Removes the map and its resources when modal is unMounted
    return () => {
      if (mapInstance) mapInstance.remove();
      console.log('Map removed!');
    };
  },
  []); // eslint-disable react-hooks/exhaustive-deps

  // sets map options
  useEffect(() => {
    if (mapRef.current && !mapInstance) {
      setMapOptions({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [10.748503539483494, 59.92003719905571],
        zoom: 10,
      });
    }
  // since the options is dependent on the ref, we set them when the ref is initialized
  }, [mapRef]);

  // initializes map
  useEffect(() => {
    if (mapOptions) {
      setMapInstance(new mapboxgl.Map(mapOptions));
      console.log('Map init!');
    }
  }, [mapOptions]);

  // adds controls and click listener to map
  useEffect(() => {
    if (mapInstance) {
      addControls({ to: mapInstance });

      mapInstance.on('click', (e) => {
        handleSetMarker(e);
      });

      // sets start marker if coords exists
      if (startCoords) {
        startMarker.setLngLat(startCoords as LngLat).addTo(mapInstance!);
      }
    }
  }, [mapInstance]);

  // Todo: Find a better solution for this..
  // the map does not fit to mobile screen when loaded
  setTimeout(() => {
    if (mapInstance) mapInstance.resize();
  }, 500);

  const reInitMap = () => {
    mapInstance!.remove();
    setMapInstance(new mapboxgl.Map(mapOptions));
    setTimeout(() => {
      setMapTranslateX('0%');
    }, animationDuration * 4);
  };

  const handleSetMarker = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    console.log('👆', `start point: ${startPointIsSet}`, `end point: ${endPointIsSet}`);

    if (!startPointIsSet) {
      console.log('Start point not set.. Gonna set it now!');
      // setStartCoords(e.lngLat);
      startMarker.setLngLat(e.lngLat).addTo(mapInstance!);
      setStartCoords(e.lngLat);
      setStartPointIsSet(true);
    }

    if (startPointIsSet && !endPointIsSet) {
      console.log('Start point is set! Setting end point..');
      endMarker.setLngLat(e.lngLat).addTo(mapInstance!);
      setEndCoords(e.lngLat);
      setEndPointIsSet(true);
    }
  };

  const handleButtonTap = () => {
    if (startCoords && !endCoords && helperString.button !== 'Done') {
      setMapTranslateX('100%');
      // displays a new message to the user
      setHelperString(helperStrings[1]);
      setTimeout(() => {
        reInitMap();
      }, animationDuration);
    } else {
      console.warn('No start coords set!');
    }

    // sets parents state
    if (startCoords && endCoords) {
      setNewHike({
        ...newHike,
        start_point: getPointString({ from: startCoords }),
        end_point: getPointString({ from: endCoords }),
      });
      setShowMapModal(false);
    } else {
      console.warn('Some coords is null!', startCoords, endCoords);
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
