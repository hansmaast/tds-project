import mapboxgl, { LngLat } from 'mapbox-gl';
import { useEffect, useState } from 'react';

interface props {
  on: mapboxgl.Map | undefined
}
export const useMapMarkers = ({ on: mapInstance }: props) => {
  const [startCoords, setStartCoords] = useState<LngLat>();
  const [endCoords, setEndCoords] = useState<LngLat>();

  const [startMarker] = useState(new mapboxgl.Marker());
  const [endMarker] = useState(new mapboxgl.Marker());
  const [startPointIsSet, setStartPointIsSet] = useState<boolean>(false);
  const [endPointIsSet, setEndPointIsSet] = useState<boolean>(false);

  // adds controls and click listener to map
  useEffect(() => {
    if (mapInstance) {
      mapInstance.on('click', (e) => {
        handleSetMarker(e);
      });

      // sets start marker if coords exists
      if (startCoords) {
        startMarker.setLngLat(startCoords as LngLat).addTo(mapInstance!);
      }
    }
  }, [mapInstance]);

  const handleSetMarker = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    console.log('👆', `start point: ${startPointIsSet}`, `end point: ${endPointIsSet}`);

    if (!startPointIsSet) {
      console.log('Start point not set.. Gonna set it now!');
      startMarker.setLngLat(e.lngLat).addTo(mapInstance!);
      setStartCoords(e.lngLat);
      setStartPointIsSet(true);
    }

    if (startPointIsSet && !endPointIsSet) {
      console.log('Start point is set! Setting end point..');
      endMarker.setLngLat(e.lngLat).addTo(mapInstance!);
      setEndCoords(e.lngLat);
      setEndPointIsSet(true);
    }
  };

  return {
    coords: {
      start: startCoords,
      end: endCoords,
    },
  };
};
