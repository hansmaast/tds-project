import styled from 'styled-components';
import { IonCard } from '@ionic/react';
import { StyledFabButton } from './buttonStyle';
import { ut_green } from './constants';

export const DisplayInfoContainer = styled('div')`
  margin: 25px 0;
  cursor: pointer;
  overflow: visible;
  width: fit-content;
  max-width: 90vw;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
export const SmallCloseButton = styled(StyledFabButton)`
position: absolute;
width: 25px;
height: 25px;
right: 0;
top: 0;
transform: translate(50%, -50%);
color: ${ut_green};
z-index: 10;
`;
export const MapInfoCard = styled(IonCard)`
padding: 10px 15px;
margin: 0;
`;
export const MapInfoCardTextContainer = styled('div')`
display: flex;
flex-direction: column;
justify-content: space-between;
`;
export const MapInfoCardImageContainer = styled('div')`
  height: 75px;
  width: 75px;
  margin-left: 15px;
`;
export const MapInfoCardImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;
