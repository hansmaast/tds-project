import { GeolocationPosition, Plugins } from '@capacitor/core';
import { useEffect, useState } from 'react';

export const useMyPosition = () => {
  const { Geolocation } = Plugins;
  const [data, setData] = useState<GeolocationPosition>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const getCurrentPosition = async () => {
    console.log('Fetching 📍!');
    setIsLoading(true);
    try {
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      setData(pos);
      console.log('Done 📍!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const start = async () => {
    if (!isTracking) {
      const tracker = Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          if (err) {
            console.error(err);
            return;
          }
          setData(position);
          setIsTracking(true);
        },
      );
      console.log('Tracker started!', tracker);
    }
  };

  const stop = async () => {
    if (isTracking) {
      try {
        await Geolocation.clearWatch({ id: '1' });
        console.log('Tracker cleared!');
        setIsTracking(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {
    myPosition: { data, isLoading },
    tracker: { start, stop, isTracking },
  };
};
