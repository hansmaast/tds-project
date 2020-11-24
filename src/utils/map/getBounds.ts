import mapboxgl, { LngLatBoundsLike } from 'mapbox-gl';

/**
 * Gets the coordinates furthermost east, west, north and south points.
 * Used for setting a bounds to the map.
 * @param coordinates
 */
export const getBounds = ({ from: coordinates }: { from: mapboxgl.LngLat[] }): LngLatBoundsLike => {
  let west: number = coordinates[0].lng;
  let south: number = coordinates[0].lat;
  let east: number = coordinates[0].lng;
  let north: number = coordinates[0].lat;

  coordinates.forEach((coor) => {
    if (coor.lng < west) west = coor.lng;
    if (coor.lng > east) east = coor.lng;
    if (coor.lat > north) north = coor.lat;
    if (coor.lat < south) south = coor.lat;
  });

  const bounds: LngLatBoundsLike = [west, south, east, north];
  console.log('Bounds -> ', bounds);

  return bounds;
};
