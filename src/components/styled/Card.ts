import styled from 'styled-components';
import { IonCard } from '@ionic/react';

type CardProps = {
  marginY?: string,
  marginX?: string,
  paddingX?: string,
  paddingY?: string,
};
export const Card = styled(IonCard)<CardProps>`
margin-top: ${(props) => props.marginY || '1em'};
margin-right: ${(props) => props.marginX || '1em'};
margin-bottom: ${(props) => props.marginY || '1em'};
margin-left: ${(props) => props.marginX || '1em'};
padding-top: ${(props) => props.paddingY || '1em'};;
padding-right: ${(props) => props.paddingX || '1em'};
padding-bottom: ${(props) => props.paddingY || '1em'};
padding-left: ${(props) => props.paddingX || '1em'};
`;
