import React, { ReactElement, useEffect, useRef } from 'react';
import { IonMenu, IonToolbar, IonHeader, IonTitle, IonContent, IonButton } from '@ionic/react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { bindActionCreators } from 'redux';
import { RootState, ThunkDispatchType, actions, Stats } from '../store';
import classes from './LeftMenu.module.css';
import { IAPProduct } from '@ionic-native/in-app-purchase-2';
import Calendar from './common/Calendar';
import { getFinishedDates, getAlmostFinishedDates } from '../utils/Dates';

interface ReduxStateProps {
  stats: Stats;
  products: IAPProduct[];
  removeAds: boolean;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  stats: state.stats,
  products: state.flags.products,
  removeAds: state.flags.removeAds,
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  subscribe: (productID: string) => Promise<void>;
  initializeInter: () => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  subscribe: actions.flags.subscribe,
  initializeInter: actions.flags.initializeInter,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const LeftMenu = ({ initializeInter, products, subscribe, removeAds, stats }: Props): ReactElement => {

  const handleInitializeAd = () => {
    initializeInter()
  }

  useEffect(() => {
    handleInitializeAd();
  }, [])

  const renderProducts = (product: IAPProduct): ReactElement => {
    return(
      <IonButton className={classes.productButton} onClick={() => subscribe(product.id)} key={product.id}>
        {product.title} {product.price}/month
      </IonButton>
    )
  }

  console.log('left menu render')

  return (
    <IonMenu side="start" menuId="left" contentId='main' color="secondary">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle color="primary">Your Stats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="secondary">

        <div className={classes.calendarContainer}>
          <Calendar finishedDates={getFinishedDates(stats.stats)} almostFinishedDates={getAlmostFinishedDates(stats.stats)}/>
        </div>

        {!removeAds && products[0] && renderProducts(products[0])}
      </IonContent>
    </IonMenu>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);