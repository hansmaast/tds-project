import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { drawLine, getTotalDistanceInMeters } from '../utils/map';
import { ut_blue, ut_green } from '../components/style/constants';

/**
 * This is a custom hook that enables marking
 * of a route on a map instance
 * @param mapInstance
 */
export const useMapMarkers = ({ on: mapInstance }: {on: mapboxgl.Map | undefined}) => {
  const [coordinates, setCoordinates] = useState<LngLat[]>([]);
  const [clickedCoord, setClickedCoord] = useState<LngLat>();
  const [totalDistanceInMeters, setTotalDistanceInMeters] = useState<number>(0);
  const [start] = useState(new mapboxgl.Marker({ color: ut_blue }));
  const [end] = useState(new mapboxgl.Marker({ color: ut_green }));

  /**
   * Removes the last element in the coordinates array.
   */
  const undoLast = () => {
    const { length } = coordinates;
    if (length === 0) return;
    if (length === 1) start.remove();
    if (length === 2) end.remove();
    setCoordinates(coordinates.slice(0, length - 1));
  };

  /**
   * Attaches a click listener to the map when
   * it is initialized. The click listener then
   * sets the coordinates of the clicked event in state.
   */
  useEffect(() => {
    if (mapInstance) {
      mapInstance.on('click', (e) => {
        setClickedCoord(e.lngLat);
      });
    }
  }, [mapInstance]);

  /**
   * Each time a new coordinate is clicked,
   * it gets added to the set of coordinates
   */
  useEffect(() => {
    if (!mapInstance) return;

    setCoordinates([...coordinates, clickedCoord!]);
  }, [clickedCoord]); // eslint-disable-line

  /**
   * This effect is triggered ach time a new coordinate
   * is added to state (when you click on the map.
   * The effect updates the drawn line and end point.
   * It also sets the total distance in meters.
   */
  useEffect(() => {
    const { length } = coordinates;
    if (mapInstance && length > 0) {
      start.setLngLat(coordinates[0] as LngLatLike).addTo(mapInstance);

      const distanceInMeters = getTotalDistanceInMeters({ from: coordinates });
      setTotalDistanceInMeters(distanceInMeters);

      if (length > 1) {
        end.setLngLat(coordinates[length - 1] as LngLatLike).addTo(mapInstance);
      }

      drawLine({ from: coordinates, on: mapInstance });
    }
  }, [coordinates, mapInstance]); // eslint-disable-line

  return {
    coordinates,
    undoLast,
    totalDistanceInMeters,
  };
};
