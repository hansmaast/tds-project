import {
  IonCard, IonCardContent, IonContent, IonPage,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex } from '../style/Containers';
import { Button } from '../style/Buttons';
import { paths } from '../utils/constants/paths';

export const Landing = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Flex fillParent column justifyContent="center">
          <IonCard>
            <IonCardContent>
              <Flex column>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push(paths.login)}>Login</Button>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push(paths.signUp)}>Sign Up</Button>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push(paths.map)}>Map</Button>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push(paths.home)}>Continue</Button>
              </Flex>
            </IonCardContent>
          </IonCard>
        </Flex>
      </IonContent>
    </IonPage>
  );
};
