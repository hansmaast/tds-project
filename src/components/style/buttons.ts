import styled from 'styled-components';
import { IonFabButton } from '@ionic/react';
import { motion } from 'framer-motion';
import {
  margin_y_10_pt,
  max_width_button,
  min_width_button,
  padding_12_pt,
  ut_black,
  ut_box_shadow,
  ut_box_shadow_hover,
  ut_green,
  ut_white,
} from './constants';

export const RoundedButton = styled(motion.div)`
color: ${ut_white};
background-color: ${ut_green};
box-shadow: ${ut_box_shadow};
font-size: 16pt;
font-weight: bold;
border-radius: 4px;
padding: ${padding_12_pt};
margin: ${margin_y_10_pt};
max-width: ${max_width_button};
min-width: ${min_width_button};
width: 100%;
text-align: center;
cursor: pointer;
transition: box-shadow 0.3s;

:hover {
  box-shadow: ${ut_box_shadow_hover};
}
`;

export const StyledFabButton = styled(IonFabButton)`
--background: ${ut_black};
align-self: center;
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
