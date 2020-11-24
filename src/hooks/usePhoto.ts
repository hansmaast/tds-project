import { useCamera } from '@capacitor-community/react-hooks/camera';
import { CameraResultType } from '@capacitor/core';

/**
 * Enables native camera use.
 */
export function usePhoto() {
  const { photo, getPhoto } = useCamera();
  const triggerCamera = async () => {
    try {
      await getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 20,
        allowEditing: false,
      });
    } catch (e) {
      console.error(e);
    }
  };
  return { photo, triggerCamera };
}
