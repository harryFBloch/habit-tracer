import React, { ReactElement } from 'react';
import { IonToolbar, IonHeader, IonButtons, IonMenuButton, IonButton, IonIcon} from '@ionic/react';
import classes from './Toolbar.module.css';
import { menu, arrowBack } from 'ionicons/icons';

interface Props {
  back?: boolean;
  backOnClick?: () => void;
  blank? : boolean;
  rightButtons?: ReactElement;
  rightMenu?: boolean;
}

export const Toolbar = ( { back = false, blank = false, rightButtons, rightMenu, backOnClick }: Props): ReactElement => {

  return (
    <IonHeader>
      <IonToolbar color="secondary">
        {!blank && 
          <IonButtons slot="start">
            {back && 
              <IonButton routerDirection="root" routerLink="/home" className="ion-no-margin ion-no-padding" onClick={backOnClick}>
                <IonIcon icon={arrowBack}/>
              </IonButton>
            }
            {!back && 
              <IonMenuButton autoHide={false} menu="left" className={classes.menuButton}>
                <IonIcon icon={menu}/>
              </IonMenuButton>
            }
          </IonButtons>
        }
        {rightButtons && 
          <IonButtons slot="end">
            {rightButtons}
          </IonButtons>
        }
      </IonToolbar>
    </IonHeader>
  );
};

export default Toolbar;