import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { IHikeList } from '../../interfaces/Post/IHikeList';
import { MarkerPopUp } from '../../components/MarkerPopUp';
import { getLngLatFrom } from '../helpers';

export function addStartingMarkers({ from: data, to: map }: { from: IHikeList, to: mapboxgl.Map }) {
  data.hikes.forEach((hike) => {
    const popUp = new mapboxgl.Popup();
    const html = renderToStaticMarkup(<MarkerPopUp text={hike.title} />);
    popUp.setHTML(html);
    const startCoords = getLngLatFrom({ pointString: hike.start_point });
    new mapboxgl.Marker()
      .setLngLat(startCoords as LngLatLike)
      .setPopup(popUp)
      .addTo(map);
  });
}
