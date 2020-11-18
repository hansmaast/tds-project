import styled from 'styled-components';
import { IonItem } from '@ionic/react';

export const Item = styled(IonItem)`
 border-radius: 7px;
 margin: 1em 0;
`;

type FlexProps = {
  row?: boolean,
  column?: boolean,
  justifyContent?: string,
  alignItems?: string,
  fillParent?: boolean
};
export const Flex = styled('div')<FlexProps>`
display: flex;
flex-direction: ${(props) => (props.column ? 'column' : 'row')};;
justify-content: ${(props) => props.justifyContent};
align-items: ${(props) => props.alignItems};
width: ${(props) => (props.fillParent ? '100%' : '')};
height: ${(props) => (props.fillParent ? '100%' : '')};
`;

export const MapContainer = styled('div')`
width: 100%;
height: 100%;
`;
