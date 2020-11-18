import styled from 'styled-components';
import { IonCard } from '@ionic/react';

type CardProps = {
  marginY?: string,
  marginX?: string,
  paddingX?: string,
  paddingY?: string,
  alignSelf?: 'center' | string,
};
export const Card = styled(IonCard)<CardProps>`
max-width: 633px;
width: 100%;
align-self: ${(props) => props.alignSelf};
margin-top: ${(props) => props.marginY};
margin-right: ${(props) => props.marginX};
margin-bottom: ${(props) => props.marginY};
margin-left: ${(props) => props.marginX};
padding-top: ${(props) => props.paddingY};
padding-right: ${(props) => props.paddingX};
padding-bottom: ${(props) => props.paddingY};
padding-left: ${(props) => props.paddingX};
`;
