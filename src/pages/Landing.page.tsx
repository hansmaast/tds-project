import { IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, IonContentWithBackground } from '../components/style/containerStyle';
import { paths } from '../navigation/paths';
import { ButtonWithAnimation } from '../components/ButtonWithAnimation';

export const Landing = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContentWithBackground fullscreen>
        <Flex noWrap fillParent direction="column" justifyContent="center" alignItems="center">
          <Flex noWrap fillParent direction="column" alignItems="center" justifyContent="center">
            <ButtonWithAnimation text="Login" linkTo={paths.login} />
            <ButtonWithAnimation text="Sign up" linkTo={paths.signUp} />
            <ButtonWithAnimation text="Map" linkTo="/map/all-routes" />
            <ButtonWithAnimation text="Browse" linkTo={paths.home} />
          </Flex>
        </Flex>
      </IonContentWithBackground>
    </IonPage>
  );
};
