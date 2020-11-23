import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { RoundedButton } from './style/buttonStyle';

interface props {
  text: string;
  // eslint-disable-next-line react/require-default-props
  linkTo?: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}
export const ButtonWithAnimation = ({ text, linkTo, onClick }: props) => {
  const history = useHistory();
  const [navigationDelay] = useState(80);
  const [scale, setScale] = useState(1);
  const [duration] = useState(0.04);

  const handleTapStart = () => {
    setScale(0.96);
  };

  const handleTapEnd = () => {
    if (linkTo) {
      setTimeout(() => {
        history.push(linkTo);
      }, navigationDelay);
    }
    setTimeout(() => setScale(1), 50);
    if (onClick) onClick();
  };

  return (
    <RoundedButton
      onTap={handleTapEnd}
      onTapStart={handleTapStart}
      animate={{ scale }}
      transition={{ duration }}
    >
      { text }
    </RoundedButton>
  );
};
