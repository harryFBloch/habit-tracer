import React, { ReactElement, useEffect } from 'react';
import { IonMenu, IonToolbar, IonHeader, IonTitle, IonContent, IonButton } from '@ionic/react';
import { connect } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css"
import { bindActionCreators } from 'redux';
import { RootState, ThunkDispatchType, actions, Stats } from '../store';
import classes from './LeftMenu.module.css';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2';
import Calendar from './common/Calendar';
import { getFinishedDates, getAlmostFinishedDates } from '../utils/Dates';
import { logout } from '../store/auth/actions';

interface ReduxStateProps {
  stats: Stats;
  products: IAPProduct[];
  removeAds: boolean;
  premium: boolean;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  stats: state.stats,
  products: state.flags.products,
  removeAds: state.flags.removeAds,
  premium: state.flags.premium,
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  subscribe: (productID: string) => Promise<string>;
  initializeInter: () => Promise<void>;
  restorePurchase: () => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  subscribe: actions.flags.subscribe,
  initializeInter: actions.flags.initializeInter,
  restorePurchase: actions.flags.restorePurchase,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const LeftMenu = ({ initializeInter, products, subscribe, removeAds, stats, restorePurchase, premium }: Props): ReactElement => {

  const handleInitializeAd = () => {
    initializeInter()
  }

  useEffect(() => {
    handleInitializeAd();
  }, [])

  const renderProducts = (product: IAPProduct): ReactElement => {
    return(
      <IonButton className={classes.productButton} 
        onClick={() => subscribe(product.id)} key={product.id} 
        color="primary">
        {product.title} {product.price}/{product.billingPeriodUnit}
      </IonButton>
    )
  }

  return (
    <IonMenu side="start" menuId="left" contentId='main' color="secondary">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Your Stats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="secondary">

        <div className={classes.calendarContainer}>
          <Calendar finishedDates={getFinishedDates(stats.stats)} almostFinishedDates={getAlmostFinishedDates(stats.stats)}/>
        </div>

        {!removeAds && products[0] && !premium && renderProducts(products[0])}
        
        <IonButton className={classes.productButton} onClick={restorePurchase}>Restore Purchases</IonButton>
        
        <IonButton className={classes.productButton} onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonMenu>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);