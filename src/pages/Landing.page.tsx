import {
  IonButton, IonCard, IonCardContent, IonContent, IonPage, IonTitle,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex } from '../components/style/Containers';
import { Button } from '../components/style/Buttons';

export const Landing = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Flex fillParent column justifyContent="center">
          <IonCard>
            <IonCardContent>
              <Flex column>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push('/login')}>Login</Button>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push('/signup')}>Sign Up</Button>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push('/map')}>Map</Button>
                <Button margin="10pt 0 10pt 0" onClick={() => history.push('/home')}>Continue</Button>
              </Flex>
            </IonCardContent>
          </IonCard>
        </Flex>
      </IonContent>
    </IonPage>
  );
};
