import React, { useState } from 'react';
import {
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowForwardCircle } from 'ionicons/icons';
import { auth } from '../utils/nhost';
import { IonContentWithBackground } from '../components/styled/IonContentWithBackground';
import { Card } from '../components/styled/Card';
import { LargeTitle, SubTitle } from '../components/styled/Text';
import { CenterContentContainer, Item } from '../components/styled/Containers';
import { LoginButton } from '../components/styled/Buttons';

interface LoginProps {
}
const LoginPage: React.FC<LoginProps> = ({}) => {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const authenticateUser = async () => {
    setIsAuthenticating(true);
    try {
      await auth.login(email, password);
      history.replace('/home');
    } catch (e) {
      setShowToast(true);
      console.error(e);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace('/home');
    }
  });

  return (
    <IonPage>
      <IonContentWithBackground>
        <CenterContentContainer>
          <LargeTitle>TDSGram</LargeTitle>
          <SubTitle>Please login to continue..</SubTitle>
          <Card marginY="3em" paddingY="1em" paddingX="3em">
            <IonList>
              <Item lines="full">
                <IonLabel>📬</IonLabel>
                <IonInput
                  value={email}
                  type="email"
                  placeholder="Email"
                  onIonInput={(e: any) => setEmail(e.target.value)}
                />
              </Item>
              <Item lines="full">
                <IonLabel>🔓</IonLabel>
                <IonInput
                  value={password}
                  type="password"
                  placeholder="Password"
                  onIonInput={(e: any) => setPassword(e.target.value)}
                />
              </Item>
            </IonList>
          </Card>
          <LoginButton onClick={() => authenticateUser()}>
            {
                isAuthenticating
                  ? <IonSpinner name="crescent" />
                  : <IonIcon icon={arrowForwardCircle} />
              }
          </LoginButton>
          <IonButton onClick={() => history.replace('/new-post')}>
            Jump to new post
          </IonButton>
        </CenterContentContainer>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Your email / password was incorrect."
          duration={3000}
          color="danger"
        />
      </IonContentWithBackground>
    </IonPage>
  );
};

export default LoginPage;
