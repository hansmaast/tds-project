import styled from 'styled-components';
import { IonCard } from '@ionic/react';
import { ut_box_shadow, ut_box_shadow_hover } from './constants';

type CardProps = {
  marginY?: string,
  marginX?: string,
  paddingX?: string,
  paddingY?: string,
  alignSelf?: 'center' | string,
};
export const Card = styled(IonCard)<CardProps>`
border-radius: 0;
max-width: 540px;
max-height: 540px;
min-width: 340px;
min-height: 375px;
width: 100vw;
height: 100%;
flex: 1 1; // grow, shrink, basis
--box-shadow: ${ut_box_shadow};
align-self: ${(props) => props.alignSelf};
cursor: pointer;
transition: box-shadow 0.3s;

:hover {
box-shadow: ${ut_box_shadow_hover};
}

@media (min-width: 663px) {
max-height: 340px;
}
`;

export const CardImage = styled('img')`
  width: 100%;
  height: 66%;
  max-height: 250px;
  min-height: 250px;
  object-fit: cover;
`;
