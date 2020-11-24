import { LngLat } from 'mapbox-gl';

/**
 * Calculates the distance from coordinate a to b
 * Using the mapbox API .distanceTo method
 * @param a
 * @param b
 */
export const getDistanceInMeters = (
  { from: a, to: b } : {from: LngLat, to: LngLat},
): number => a.distanceTo(b);

/**
 * Calculates the distance in a set of coordinates
 * @param setOfCoordinates
 */
export const getTotalDistanceInMeters = (
  { from: setOfCoordinates }:{from: LngLat[]},
): number => {
  let meters: number = 0;

  const setDistance = () => {
    const { length } = setOfCoordinates;
    if (length === 0) return;
    setOfCoordinates.forEach((coor, i) => {
      if (i + 1 === length) return;
      const a = setOfCoordinates[i];
      const b = setOfCoordinates[i + 1];
      const distance = getDistanceInMeters({ from: a, to: b });
      meters += distance;
    });
  };
  setDistance();

  console.log('Total distance: ', meters);
  return meters;
};
