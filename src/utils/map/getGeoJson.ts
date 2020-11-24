import { LngLat } from 'mapbox-gl';

/**
 * Retruns a geoJson style object from a set of coordinates
 * @param coordinates
 */
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
