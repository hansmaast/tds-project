import styled from 'styled-components';
import { IonIcon } from '@ionic/react';
import {
  ut_black, ut_box_shadow, ut_green, ut_white,
} from './constants';

export const StyledIcon = styled(IonIcon)`
  background-color: ${ut_green};
  color: ${ut_white};
  padding: 4pt;
  font-size: 12pt;
  border-radius: 4px;
  box-shadow: ${ut_box_shadow};
  transition: background-color 300ms ease;

  :hover {
    background-color: ${ut_black};
  }
`;
