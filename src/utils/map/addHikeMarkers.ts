import mapboxgl from 'mapbox-gl';
import { IHikeMarkers } from '../../types';
import { drawRouteLine } from './drawLine';
import { getLngLat } from './transformers';

export const addHikeMarkers = (
  { from: data, to: map, setDisplayInfo }: IHikeMarkers,
) => {
  data.hikes.forEach((hike) => {
    const startCoords = getLngLat({ from: hike.coordinates[0].lng_lat });
    const marker = new mapboxgl.Marker()
      .setLngLat(startCoords)
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      drawRouteLine({ from: hike, on: map });
      setDisplayInfo({ display: true, info: hike });
    });
  });
};
