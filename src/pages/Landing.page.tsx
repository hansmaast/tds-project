import { IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonContentWithBackground } from '../style/containerStyle';
import { paths } from '../utils/constants/paths';
import { ButtonWithAnimation } from '../components/ButtonWithAnimation';
import { Card } from '../style/cards';
import { ut_gray_background } from '../style/constants';

export const Landing = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContentWithBackground fullscreen>
        <div style={{
          width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <Card style={{ backgroundColor: ut_gray_background }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
            >
              <ButtonWithAnimation text="Login" linkTo={paths.login} />
              <ButtonWithAnimation text="Sign up" linkTo={paths.signUp} />
              <ButtonWithAnimation text="Map" linkTo={paths.map} />
              <ButtonWithAnimation text="Browse" linkTo={paths.home} />
            </div>
          </Card>
        </div>
      </IonContentWithBackground>
    </IonPage>
  );
};
