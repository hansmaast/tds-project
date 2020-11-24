import React from 'react';
import { useHistory } from 'react-router';
import { IonRouterLink } from '@ionic/react';
import { Flex, FullScreenModal } from './style/containers';
import { ButtonWithAnimation } from './ButtonWithAnimation';
import { paths } from '../navigation/paths';

interface props {
  open: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const YouNeedToLogin = ({ open, setShowLoginModal }: props) => {
  const history = useHistory();
  return (
    <FullScreenModal isOpen={open}>
      <Flex noWrap direction="column" fillParent alignItems="center" justifyContent="center">
        <h3>Sorry,</h3>
        <h3>You need to</h3>
        <ButtonWithAnimation text="Log In" linkTo={paths.login} onClick={() => setShowLoginModal(false)} />
        <h3>or</h3>
        <ButtonWithAnimation text="Sign Up" linkTo={paths.signUp} onClick={() => setShowLoginModal(false)} />
        <h4>To view this content.</h4>
        <p>Not interested?</p>
        <IonRouterLink style={{ cursor: 'pointer' }} onClick={() => history.replace(paths.home)}>
          Go Home
        </IonRouterLink>
      </Flex>
    </FullScreenModal>
  );
};
