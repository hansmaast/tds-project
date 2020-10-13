import {
  IonAvatar, IonItem, IonLabel, IonSkeletonText,
} from '@ionic/react';
import React from 'react';

export function SkeletonComment() {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonSkeletonText animated />
      </IonAvatar>
      <IonLabel>
        <h3>
          <IonSkeletonText animated style={{ width: '50%' }} />
        </h3>
        <p>
          <IonSkeletonText animated style={{ width: '80%' }} />
        </p>
      </IonLabel>
    </IonItem>
  );
}
