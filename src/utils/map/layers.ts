import { Layer } from 'mapbox-gl';

/**
 * This is the layer for the route line on the map.
 */
export const routeLine: Layer = {
  id: 'route',
  type: 'line',
  source: 'route',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#4c4646',
    'line-width': 5,
  },
};
