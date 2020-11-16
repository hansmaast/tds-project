import React, { useEffect, useState } from 'react';
import {
  IonIcon,
  IonInput,
  IonLabel,
  IonList,
  IonPage, IonRouterLink,
  IonSpinner,
  IonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { NavLink, useHistory } from 'react-router-dom';
import { arrowForwardCircle } from 'ionicons/icons';
import { auth } from '../utils/nhost';
import { IonContentWithBackground } from '../components/style/IonContentWithBackground';
import { Flex, Item } from '../components/style/Containers';
import { LargeTitle, SubTitle } from '../components/style/Text';
import { Button, RoundArrowButton } from '../components/style/Buttons';
import { Card } from '../components/style/Card';
import { APP_NAME } from '../utils/constants/strings';
import BackButtonHeader from '../components/headers/BackButtonHeader';
import { useAuthentication } from '../utils/hooks/useAuthetication';

export const SignUp: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {
    authMethods, isAuthenticating, authError, setAuthError,
  } = useAuthentication();

  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace('/home');
    }
  });

  return (
    <IonPage>
      <BackButtonHeader defaultHref="/" title="Sign up" />
      <IonContentWithBackground>
        <Flex fillParent column justifyContent="center">
          <LargeTitle>{ APP_NAME }</LargeTitle>
          <SubTitle>Please sign up to continue..</SubTitle>
          <Card marginY="3em" paddingY="1em" paddingX="3em">
            <IonList>
              <Item lines="full">
                <IonLabel>
                  <span role="img" aria-label="mail">📬</span>
                </IonLabel>
                <IonInput
                  value={email}
                  type="email"
                  placeholder="Email"
                  onIonInput={(e: any) => setEmail(e.target.value)}
                />
              </Item>
              <Item lines="full">
                <IonLabel>
                  <span role="img" aria-label="lock">🔓</span>
                </IonLabel>
                <IonInput
                  value={password}
                  type="password"
                  placeholder="Password"
                  onIonInput={(e: any) => setPassword(e.target.value)}
                />
              </Item>
            </IonList>
          </Card>
          <RoundArrowButton onClick={() => authMethods.register({ email, password })}>
            {
                isAuthenticating
                  ? <IonSpinner name="crescent" />
                  : <IonIcon icon={arrowForwardCircle} />
              }
          </RoundArrowButton>
          <SubTitle>Already signed up?</SubTitle>
          <SubTitle>No problem. Just press the link below.</SubTitle>
          <SubTitle>
            <IonRouterLink onClick={() => history.replace('/login')}>
              Log in
            </IonRouterLink>
          </SubTitle>

        </Flex>
        <IonToast
          isOpen={!!authError}
          onDidDismiss={() => setAuthError('')}
          message={authError}
          duration={3000}
          color="danger"
        />
      </IonContentWithBackground>
    </IonPage>
  );
};
