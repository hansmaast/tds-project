import React, { useState } from 'react';
import {
  IonIcon,
  IonInput,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowForwardCircle } from 'ionicons/icons';
import { auth } from '../utils/nhost';
import { IonContentWithBackground } from '../style/IonContentWithBackground';
import { Flex, Item } from '../style/Containers';
import { LargeTitle, SubTitle } from '../style/Text';
import { RoundArrowButton } from '../style/Buttons';
import { Card } from '../style/Card';
import { APP_NAME } from '../utils/constants/strings';
import BackButtonHeader from '../components/BackButtonHeader';
import { useAuthentication } from '../hooks/useAuthetication';
import { paths } from '../utils/constants/paths';

export const SignUp: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {
    authMethods, isAuthenticating, authError, setAuthError,
  } = useAuthentication();

  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace(paths.home);
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
            <IonRouterLink onClick={() => history.replace(paths.login)}>
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
