import styled from 'styled-components';
import { IonFabButton } from '@ionic/react';
import { palette } from '../../constants/colors';

export const LoginButton = styled(IonFabButton)`
--background: #${palette.black};
align-self: center;
`;
