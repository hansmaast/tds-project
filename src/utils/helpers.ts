import { CameraPhoto } from '@capacitor/core';
import mapboxgl, { LngLat } from 'mapbox-gl';
import { auth } from './nhost';
import { PUBLIC_STORAGE } from './constants/urls';
import { IdbCoords } from '../types';

export const getFilenameForPhoto = (_photo: CameraPhoto): string => {
  try {
    const userId: string = auth.getClaim('x-hasura-user-id');
    const dateString: string = Date.now().toString();
    return `${userId}/${dateString}.${_photo.format}`;
  } catch (e) {
    console.error(e);
    return '';
  }
};

export const getLngLat = (
  { from: pointString }: { from: string },
) : number[] => {
  const endIndex = pointString.length - 1;
  const lngLatString = pointString.substring(1, endIndex).split(',');
  return lngLatString.map((s) => parseFloat(s));
};

export const getIdbCoords = (
  { from: coordinates }: {from: mapboxgl.LngLat[] },
): IdbCoords[] => coordinates.map((c, i) => ({
  lng_lat: getPointString({ from: c }),
  index: i,
} as IdbCoords));

export const getPointString = (
  { from: lngLat }: {from: LngLat},
) : string => `(${lngLat.lng},${lngLat.lat})`;

export const getPhotoUrl = (
  { from: publicPhotoPath } : {from: string},
) : string => PUBLIC_STORAGE + publicPhotoPath;
