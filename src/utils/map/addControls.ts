import mapboxgl from 'mapbox-gl';

/**
 * Adds controls to the map. Currently just the 'GeoLocateControl'
 * @param map
 */

export const addControls = ({ to: map }: { to: mapboxgl.Map }) => {
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  }));
};
