import mapboxgl, { LngLat } from 'mapbox-gl';
import { IdbCoords } from '../../types';

/**
 * Transforms mapbox type LngLat to postgres type Point (IdbCoords) <-->
 */

export const getLngLatCoords = (
  { from: coordinates }: { from: IdbCoords[] },
): LngLat[] => coordinates.map((coor) => getLngLat({ from: coor.lng_lat }));

export const getLngLat = (
  { from: pointString }: { from: string },
): LngLat => {
  const endIndex = pointString.length - 1;
  const lngLatString = pointString.substring(1, endIndex).split(',');
  const lngLat = {
    lng: parseFloat(lngLatString[0]),
    lat: parseFloat(lngLatString[1]),
  } as LngLat;
  return lngLat;
};

export const getIdbCoords = (
  { from: coordinates }: { from: mapboxgl.LngLat[] },
): IdbCoords[] => coordinates.map((c, i) => ({
  lng_lat: getPointString({ from: c }),
  index: i,
} as IdbCoords));

export const getPointString = (
  { from: lngLat }: { from: LngLat },
): string => `(${lngLat.lng},${lngLat.lat})`;
