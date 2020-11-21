import mapboxgl, {
  GeoJSONSource, GeoJSONSourceRaw, Layer, LngLat,
} from 'mapbox-gl';
import { Feature } from 'geojson';
import { getGeoJson } from './getGeoJson';
import { routeLine } from './layers';
import { IHike } from '../../types';
import { getBounds } from './getBounds';
import { getLngLatCoords } from './transformers';

export const drawLine = (
  { from: coordinates, on: mapInstance }: { from: LngLat[], on: mapboxgl.Map },
) => {
  const routeSrc: GeoJSONSource = mapInstance.getSource('route') as GeoJSONSource;
  const routeLayer: Layer = mapInstance.getLayer('route');
  const geoJson = getGeoJson({ from: coordinates! });

  if (!routeSrc) mapInstance.addSource('route', geoJson as GeoJSONSourceRaw);
  if (!routeLayer) mapInstance.addLayer(routeLine);
  if (routeSrc) routeSrc.setData(geoJson.data.features[0] as Feature);
};

export const drawRouteLine = (
  { from: hike, on: map }: { from: IHike, on: mapboxgl.Map },
) => {
  const { coordinates } = hike;
  const { length } = coordinates;
  const lngLatCoords = getLngLatCoords({ from: coordinates });
  const bounds = getBounds({ from: lngLatCoords });
  drawLine({ from: lngLatCoords!, on: map! });
  map.fitBounds(bounds, {
    padding: {
      bottom: 100, left: 100, right: 100, top: 100,
    },
  });
  endMarker.setLngLat(lngLatCoords[length - 1]);
  endMarker.addTo(map);
};

export const removeRouteLine = ({ from: map }: { from: mapboxgl.Map }) => {
  endMarker.remove();
  map.removeLayer('route');
};

const endMarker = new mapboxgl.Marker({ color: 'green' });
