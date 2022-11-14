import React , { ReactElement, useState} from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonText, IonToolbar } from '@ionic/react';
import { bindActionCreators } from 'redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { closeOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import classes from './Premium.module.css';
import  sunrise from '../../images/sunrise.png';
import { actions, RootState, ThunkDispatchType } from '../../store';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2';
import { subscribe } from '../../store/flags/actions';

interface ReduxStateProps {
  products: IAPProduct[];
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  products: state.flags.products,
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  restorePurchase: () => Promise<void>;
  subscribe: (id: string) => Promise<string>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  restorePurchase: actions.flags.restorePurchase,
  subscribe: actions.flags.subscribe,
}, dispatch);

interface ParrentProps {
  onNext?: () => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> & RouteComponentProps & ParrentProps

export const Premium = ({ restorePurchase, products, history, subscribe, onNext}: Props): ReactElement => {

  const [selected, setSelected] = useState(2);

  const handlebuttonPress = (): void => {
    subscribe(products[selected].id)
    .then(() => {
    })
  }

  return(
    <>
    <IonHeader>
     <IonToolbar className={classes.toolbar}>
        <IonButtons slot='end'>
          <IonButton onClick={() => {
            if(onNext){ 
              onNext()
            }
            }}>
            <IonIcon icon={closeOutline}/>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      </IonHeader>
    <div className={classes.pageContainer}>
      <h3 className={classes.title}>Limited Time Offer</h3>
      <h4 className={classes.subTitle}>Save 50% on premium!</h4>
      <div className={classes.imageContainer}>
        <img src={sunrise} alt="sunrise"/>   
      </div>
      {/* put image here!!!! */}
      <ul className={classes.listContainer}>
        <li className={classes.bullet}>
          Access to all current and future Challenges
        </li>

        <li className={classes.bullet}>
          Create and Track unlimted new Habits
        </li>

        <li className={classes.bullet}>
          Remove all ads
        </li>
      </ul>

      {products[2] && products[2].id === "year" && products[1] && products[1].id === "PA" && 

        <>
          <div className={`${classes.selectDiv} ${selected === 2 ? classes.selectedDiv : ''}`}
          onClick={() => {setSelected(2)}}>
            <IonText className={classes.price}>{products[2].price}/{products[2].billingPeriodUnit}</IonText>
            <IonText className={classes.subText}>You Save 50%</IonText>
          </div>
          <div className={`${classes.selectDiv} ${selected === 1 ? classes.selectedDiv : ''}`}
          onClick={() => {setSelected(1)}}>
            <IonText className={classes.price}>{products[1].price}/{products[1].billingPeriodUnit}</IonText>
          </div>
          <IonText>
            <button className={classes.linkStyle} onClick={() => history.push('/terms')}>terms of service</button>
              &nbsp;and&nbsp;
              <button className={classes.linkStyle} onClick={() => history.push('/privacy')}>privacy policy</button></IonText>
        </>
      }
      
      
      <div className={classes.buttonContainer}>
        <IonButton className={classes.purchaseButton} color="tertiary" onClick={handlebuttonPress}>
          Continue
        </IonButton>
        <IonButton size="small" fill="clear" onClick={restorePurchase} className={classes.linkButton}>
          Restore Purchase
        </IonButton>
      </div>
    </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Premium))