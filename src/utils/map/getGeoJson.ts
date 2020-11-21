import { LngLat } from 'mapbox-gl';

export const getGeoJson = (
  { from: coordinates }: { from: LngLat[] },
) => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          ...coordinates.map((coor) => [coor.lng, coor.lat]),
        ],
      },
    }],
  },
});
