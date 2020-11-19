import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { drawLine } from '../utils/map/drawLine';
import { getTotalDistanceInMeters } from '../utils/map/getDistance';

export const useMapMarkers = ({ on: mapInstance }: {on: mapboxgl.Map | undefined}) => {
  const [coordinates, setCoordinates] = useState<LngLat[]>([]);
  const [clickedCoord, setClickedCoord] = useState<LngLat>();
  const [start] = useState(new mapboxgl.Marker({ color: 'blue' }));
  const [end] = useState(new mapboxgl.Marker({ color: 'green' }));

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
    console.log(e.lngLat);
    setClickedCoord(e.lngLat);
  };

  useEffect(() => {
    console.log('coors arr ->', coordinates);
    const { length } = coordinates;
    if (mapInstance && length > 0) {
      start.setLngLat(coordinates[0] as LngLatLike).addTo(mapInstance);

      // Todo: put this in state? display and store in db
      const distanceInMeters = getTotalDistanceInMeters({ from: coordinates });
      console.log('Meters: ', distanceInMeters);
      if (length > 1) {
        end.setLngLat(coordinates[length - 1] as LngLatLike).addTo(mapInstance);
      }

      drawLine(coordinates, mapInstance);
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
  };
};
