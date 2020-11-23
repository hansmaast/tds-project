import styled, { createGlobalStyle } from 'styled-components';
import { IonContent, IonItem, IonModal } from '@ionic/react';
import { motion } from 'framer-motion';
import { font, ut_gray_background, ut_white } from './constants';

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

export const IonContentWithBackground = styled(IonContent)`
background-image: url("../../assets/background.jpg");
background-size: cover;
height: 100%;
width: 100%;
background-size: cover;
--ion-background-color: transparent;
`;

export const MapContainer = styled(motion.div)`
width: 100%;
height: 100%;
`;

export const Item = styled(IonItem)`
 border-radius: 7px;
 margin: 1em 0;
`;

export const FullScreenModal = styled(IonModal)`
--width: 100%;
--height: 100%;
--border-radius: 0;
`;
