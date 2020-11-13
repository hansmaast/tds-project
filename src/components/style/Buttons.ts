import styled from 'styled-components';
import { IonButton, IonFabButton } from '@ionic/react';
import { palette } from '../../utils/constants/colors';

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
  height?: string,
  alignSelf?: string,
}
export const Button = styled(IonButton)<ButtonProps>`
--border-radius: 50px;
align-self: ${(props) => props.alignSelf};
margin: ${(props) => props.margin};
width: ${(props) => props.width};
height: ${(props) => props.height};
`;
