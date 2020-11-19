import styled from 'styled-components';
import { IonButton, IonFabButton } from '@ionic/react';
import { motion } from 'framer-motion';
import { palette } from '../utils/constants/colors';

export const RoundArrowButton = styled(IonFabButton)`
--background: #${palette.black};
align-self: center;
`;

type ButtonProps = {
  marginTop?: string,
  marginBottom?: string,
  marginLeft?: string,
  marginRight?: string,
  marginX?: string,
  marginY?: string,
  margin?: string,
  width?: string,
  padding?: string,
  height?: string,
  alignSelf?: string,
}
export const Button = styled(IonButton)<ButtonProps>`
--border-radius: 50px;
align-self: ${(props) => props.alignSelf};
margin: ${(props) => props.margin};
width: ${(props) => props.width};
height: ${(props) => props.height};
padding: ${(props) => props.padding};
`;

export const RoundedButton = styled(motion.div)`
color: white;
border-radius: 50px;
border: 1px solid rgba(255, 255, 255, 0.5);
padding: 12pt 0 12pt 0;
max-width: 400px;
width: 100%;
font-size: 14pt;
text-align: center;
margin: 10pt 0 10pt 0;
transition: all 0.3s;
background-color: #1d47bf;

`;
