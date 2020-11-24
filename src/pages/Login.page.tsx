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
import { APP_NAME } from '../utils/constants/strings';
import { useAuthentication } from '../hooks/useAuthetication';
import { paths } from '../navigation/paths';
import { Item } from '../components/style/containers';
import { LargeTitle, SubTitle } from '../components/style/textStyle';
import { StyledFabButton } from '../components/style/buttons';

export const Login: React.FC = () => {
  const {
    authMethods, isAuthenticating, authError, setAuthError,
  } = useAuthentication();
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // redirects if logged in
  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace(paths.home);
    }
  });

  return (
    <IonPage>
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%',
      }}
      >
        <LargeTitle>{ APP_NAME }</LargeTitle>
        <SubTitle>Please login to continue..</SubTitle>

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

        <StyledFabButton onClick={() => authMethods.login({ email, password })}>
          {
                isAuthenticating
                  ? <IonSpinner name="crescent" />
                  : <IonIcon icon={arrowForwardCircle} />
              }
        </StyledFabButton>
        <SubTitle>Not signed up yet?</SubTitle>
        <SubTitle>No problem. Just press the link below.</SubTitle>
        <SubTitle>
          <IonRouterLink onClick={() => history.replace(paths.signUp)}>
            Sign up
          </IonRouterLink>
        </SubTitle>
      </div>
      <IonToast
        isOpen={!!authError}
        onDidDismiss={() => setAuthError('')}
        message={authError}
        duration={3000}
        color="danger"
      />
    </IonPage>
  );
};
