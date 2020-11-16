import styled from 'styled-components';
import { IonContent } from '@ionic/react';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import WaveBlob from '../icons/WaveBlob';

const waveBlobString = encodeURIComponent(renderToStaticMarkup(<WaveBlob />));

export const IonContentWithBackground = styled(IonContent)`
background: url("data:image/svg+xml,${waveBlobString}");
background-size: cover;
background-position-x: 760px;
`;
