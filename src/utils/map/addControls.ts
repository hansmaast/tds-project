import mapboxgl from 'mapbox-gl';

export const addControls = ({ to: map }: { to: mapboxgl.Map }) => {
  // add navigation control (the +/- zoom buttons)
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  }));
};
