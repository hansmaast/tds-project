import React, { useEffect, useState } from 'react';
import mapboxgl, { MapboxOptions } from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '../utils/constants/secrets';
import { addControls } from '../utils/map';

interface props {
  in: React.MutableRefObject<HTMLDivElement | null>;
}

export const useMapInstance = ({ in: mapRef }: props) => {
  const [instance, setInstance] = useState<mapboxgl.Map>();
  const [options, setOptions] = useState<MapboxOptions>();

  useEffect(() =>
  // Removes the map and its resources when modal is unMounted
    () => {
      if (instance) instance.remove();
      console.log('Map removed!');
    },
  []); // eslint-disable react-hooks/exhaustive-deps

  // sets map options
  useEffect(() => {
    if (mapRef.current && !instance) {
      setOptions({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [10.748503539483494, 59.92003719905571],
        zoom: 10,
      });
    }
  }, [mapRef]);

  // initializes map
  useEffect(() => {
    if (options) {
      setInstance(new mapboxgl.Map(options));
      console.log('Map init!');
    }
  }, [options]);

  useEffect(() => {
    if (instance) {
      instance.on('load', () => {
        instance.resize();
      });

      addControls({ to: instance });
    }
  }, [instance]);

  const reInit = () => {
    instance!.remove();
    setInstance(new mapboxgl.Map(options));
  };

  return {
    map: {
      instance,
      reInit,
    },
  };
};
