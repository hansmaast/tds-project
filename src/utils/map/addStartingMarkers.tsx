import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { MarkerPopUp } from '../../components/MarkerPopUp';
import { getLngLat } from '../helpers';
import { IHikeList } from '../../types';

export function addStartingMarkers({ from: data, to: map }: { from: IHikeList, to: mapboxgl.Map }) {
  data.hikes.forEach((hike) => {
    const popUp = new mapboxgl.Popup();
    const html = renderToStaticMarkup(<MarkerPopUp text={hike.title} />);
    popUp.setHTML(html);
    const startCoords = getLngLat({ from: hike.start_point });
    new mapboxgl.Marker()
      .setLngLat(startCoords as LngLatLike)
      .setPopup(popUp)
      .addTo(map);
  });
}
