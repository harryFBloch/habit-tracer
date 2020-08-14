import React, { ReactElement, useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { RouteComponentProps } from 'react-router';


export const Onboarding = ({ history }: RouteComponentProps): ReactElement => {

  let options: StreamingVideoOptions = {
    successCallback: () => { history.push('home') },
    errorCallback: () => { history.push('home') },
    orientation: 'portrait',
    shouldAutoClose: true,
    controls: false,
  };

  useEffect(() => {
   StreamingMedia.playVideo('https://firebasestorage.googleapis.com/v0/b/habit-tracker-7c2ac.appspot.com/o/HabitTracerOnboarding.mp4?alt=media&token=bb62a783-972e-434c-973c-f968f25fa721', options)
  }, [])

  return (
    <IonPage>
      <IonContent>
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Onboarding