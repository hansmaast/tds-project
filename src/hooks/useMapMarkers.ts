import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { drawLine, getTotalDistanceInMeters } from '../utils/map';
import { ut_blue, ut_green } from '../style/constants';

export const useMapMarkers = ({ on: mapInstance }: {on: mapboxgl.Map | undefined}) => {
  const [coordinates, setCoordinates] = useState<LngLat[]>([]);
  const [clickedCoord, setClickedCoord] = useState<LngLat>();
  const [totalDistanceInMeters, setTotalDistanceInMeters] = useState<number>(0);
  const [start] = useState(new mapboxgl.Marker({ color: ut_blue }));
  const [end] = useState(new mapboxgl.Marker({ color: ut_green }));

  // adds controls and click listener to map
  useEffect(() => {
    if (mapInstance) {
      mapInstance.on('click', (e) => {
        handleSetMarker(e);
      });
    }
  }, [mapInstance]);

  const undoLast = () => {
    const { length } = coordinates;
    if (length === 0) return;
    if (length === 1) start.remove();
    if (length === 2) end.remove();
    setCoordinates(coordinates.slice(0, length - 1));
  };

  const handleSetMarker = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    console.log('👆', e.lngLat);
    setClickedCoord(e.lngLat);
  };

  useEffect(() => {
    console.log('coors arr ->', coordinates);
    const { length } = coordinates;
    if (mapInstance && length > 0) {
      start.setLngLat(coordinates[0] as LngLatLike).addTo(mapInstance);

      const distanceInMeters = getTotalDistanceInMeters({ from: coordinates });
      setTotalDistanceInMeters(distanceInMeters);
      console.log('Meters: ', distanceInMeters);
      if (length > 1) {
        end.setLngLat(coordinates[length - 1] as LngLatLike).addTo(mapInstance);
      }

      drawLine({ from: coordinates, on: mapInstance });
    }
  }, [coordinates, mapInstance]);

  useEffect(() => {
    if (!mapInstance) return;

    setCoordinates([...coordinates, clickedCoord!]);
  }, [clickedCoord]);

  return {
    markers: {
      coordinates,
      undoLast,
    },
    totalDistanceInMeters,
  };
};
