import { Layer } from 'mapbox-gl';

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
