import { IonButton } from '@ionic/react';
import React, { ReactElement, useState } from 'react';
import classes from './ButtonWithButtons.module.css';

interface Props {
  text: string;
  rightButton: ReactElement,
  leftButton: ReactElement,
  color: string,
  className: string
}

export const ButtonWithButtons = ({ text, rightButton, leftButton, color, className}: Props): ReactElement => {

  const [activateButtons, setActivateButtons] = useState(false);

  return (
    <div style={{display: 'inline-block', position: 'relative'}}>
      <IonButton className={className} onClick={() => setActivateButtons(!activateButtons)} color={color}>
        {text}
      </IonButton>
      <div className={`${activateButtons ? classes.floatingButtonContainer : classes.hidden}`} onClick={() => { setActivateButtons(!activateButtons)}}>
        {rightButton}
        {leftButton}
      </div>
    </div>
  )
}