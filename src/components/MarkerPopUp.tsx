import { IonCard, IonCardContent } from '@ionic/react';
import React from 'react';

export const MarkerPopUp = ({ text }: {text: string}) => (
  <IonCard>
    <IonCardContent>
      <h1>
        {text }
      </h1>
    </IonCardContent>
  </IonCard>
);
