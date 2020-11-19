import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { RoundedButton } from '../../style/Buttons';

export const ButtonWithAnimation = ({ text, linkTo }: {text: string, linkTo: string}) => {
  const history = useHistory();
  const [navigationDelay] = useState(80);
  const [scale, setScale] = useState(1);
  const [duration] = useState(0.01);

  const handleTapStart = () => {
    setScale(0.93);
  };

  const handleTapEnd = () => {
    setTimeout(() => {
      history.push(linkTo);
    }, navigationDelay);
    setTimeout(() => setScale(1), 50);
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
