import mapboxgl from 'mapbox-gl';
import { IHikeMarkers } from '../../types';
import { drawLineAndFitBounds } from './drawLine';
import { getLngLat } from './transformers';

/**
 * Sets up the 'main' map with markers for each hike
 * and adds an event listener to each marker,
 * triggering the drawLineAndFitToBounds and displaying small popup
 * @param data
 * @param map
 * @param setDisplayInfo
 */
export const addHikeMarkers = (
  { from: data, to: map, setDisplayInfo }: IHikeMarkers,
) => {
  data.hikes.forEach((hike) => {
    const startCoords = getLngLat({ from: hike.coordinates[0].lng_lat });
    const marker = new mapboxgl.Marker()
      .setLngLat(startCoords)
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      drawLineAndFitBounds({ from: hike, on: map });
      setDisplayInfo({ display: true, info: hike });
    });
  });
};
