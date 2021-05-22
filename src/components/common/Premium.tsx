import React , { ReactElement, useState} from 'react';
import { IonButton, IonText } from '@ionic/react';
import { bindActionCreators } from 'redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Premium.module.css';
import  sunrise from '../../images/sunrise.png';
import { actions, RootState, ThunkDispatchType } from '../../store';
import { IAPProduct } from '@ionic-native/in-app-purchase-2';
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

  const [selected, setSelected] = useState(0);

  const handlebuttonPress = (): void => {
    if (selected === 0) {
      subscribe(products[1].id)
      .then(() => {
      })
    } else {
      console.log('on' , onNext)
      onNext && onNext()
      !onNext && history.push('/home');
    }
  }

  return(
    <div className={classes.pageContainer}>
      <div className={classes.imageContainer}>
        <img src={sunrise} alt="sunrise"/>
      </div>
      <h3 className={classes.subTitle}>Try Habit Tracer Premium for free</h3>
      <ul className={classes.listContainer}>
        <li className={classes.bullet}>
          Access to all current and future Challenges
        </li>

        <li className={classes.bullet}>
          Create unlimted new Habits
        </li>

        <li className={classes.bullet}>
          Remove all ads
        </li>

        <li className={classes.bullet}>
          FREE 3 day trial
        </li>
      </ul>

      {products[1] && products[1].id === "PA" && 

        <div className={`${classes.selectDiv} ${selected === 0 ? classes.selectedDiv : ''}`}
        onClick={() => {setSelected(0)}}>
          <IonText className={classes.price}>{products[1].price}/{products[1].billingPeriodUnit}</IonText>
          <IonText className={classes.subText}>First 3 days FREE</IonText>
        </div>
      }

      <div className={`${classes.selectDiv} ${selected === 1 ? classes.selectedDiv : ''}`}
      onClick={() => {setSelected(1)}}>
        <IonText className={classes.price}>No Thanks</IonText>
        <IonText className={classes.subText}>take me to the app</IonText>
      </div>

      
      <div className={classes.buttonContainer}>
        <IonButton className={classes.purchaseButton} color="tertiary" onClick={handlebuttonPress}>
        {selected === 0 ? 'Try free and subscribe': 'Take me to the app'}
        </IonButton>
        <IonButton size="small" fill="clear" onClick={restorePurchase} className={classes.linkButton}>
          Restore Purchase
        </IonButton>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Premium))