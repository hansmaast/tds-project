import styled, { createGlobalStyle } from 'styled-components';
import { IonItem, IonModal } from '@ionic/react';
import { motion } from 'framer-motion';
import {
  font, ut_gray_background, ut_green, ut_white,
} from './constants';

export const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  body {
    max-width: 1400px;
    
    --ion-background-color: ${ut_gray_background};
    --ion-card-background: ${ut_white};
    --ion-font-family: ${font.name}, ${font.family};
  }
  * {
  --ion-color-primary: ${ut_green};
  box-sizing: border-box;
  font-family: ${font.name}, ${font.family};
  }
`;

type FlexProps = {
  direction?: string,
  column?: boolean,
  justifyContent?: string,
  alignItems?: string,
  fillParent?: boolean,
  noWrap?: boolean
};
export const Flex = styled('div')<FlexProps>`
display: flex;
flex-direction: ${(props) => props.direction};;
justify-content: ${(props) => props.justifyContent};
align-items: ${(props) => props.alignItems};
width: ${(props) => (props.fillParent ? '100%' : '')};
height: ${(props) => (props.fillParent ? '100%' : '')};
background-color: transparent;

@media(min-width:  722px) { 
 flex-flow: ${(props) => (props.noWrap ? props.direction : 'row wrap')};
 justify-content: ${(props) => (props.noWrap ? props.justifyContent : 'space-between')};
}
`;

export const FullScreenModal = styled(IonModal)`
--width: 100%;
--height: 100%;
--border-radius: 0;
`;

export const MapContainer = styled(motion.div)`
width: 100%;
height: 100%;
`;

export const DisplayInfoContainer = styled('div')`
  margin: 35px 0;
  cursor: pointer;
  overflow: visible;
  width: fit-content;
  max-width: 90vw;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
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

export const Item = styled(IonItem)`
 border-radius: 7px;
 margin: 1em 0;
`;
