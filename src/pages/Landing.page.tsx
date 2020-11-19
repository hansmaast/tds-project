import {
  IonCard, IonCardContent, IonContent, IonPage,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex } from '../style/Containers';
import { paths } from '../utils/constants/paths';
import { ButtonWithAnimation } from '../components/ButtonWithAnimation';

export const Landing = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Flex fillParent column justifyContent="center">
          <IonCard>
            <IonCardContent>
              <Flex column fillParent alignItems="center">
                <ButtonWithAnimation text="Login" linkTo={paths.login} />
                <ButtonWithAnimation text="Sign up" linkTo={paths.signUp} />
                <ButtonWithAnimation text="Map" linkTo={paths.map} />
                <ButtonWithAnimation text="Continue" linkTo={paths.home} />
              </Flex>
            </IonCardContent>
          </IonCard>
        </Flex>
      </IonContent>
    </IonPage>
  );
};
