import { CameraPhoto } from '@capacitor/core';
import { auth } from './nhost';

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
