import mapboxgl, { GeoJSONSource, GeoJSONSourceRaw } from 'mapbox-gl';
import { Feature } from 'geojson';
import { getGeoJson } from './getGeoJson';
import { routeLine } from './layers';

export const drawLine = (coordinates: mapboxgl.LngLat[], mapInstance: mapboxgl.Map) => {
  const routeSrc: GeoJSONSource = mapInstance.getSource('route') as GeoJSONSource;
  const geoJson = getGeoJson({ from: coordinates! });

  if (!routeSrc) {
    mapInstance.addSource('route', geoJson as GeoJSONSourceRaw);
    mapInstance.addLayer(routeLine);
  }
  if (routeSrc) {
    routeSrc.setData(geoJson.data.features[0] as Feature);
  }
};
