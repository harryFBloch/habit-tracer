import React, { ReactElement, useEffect } from "react";
import {InAppPurchase2, IAPProduct, IAPProducts} from '@ionic-native/in-app-purchase-2';
import { connect } from 'react-redux';
import { RootState, ThunkDispatchType, actions } from "../../store";
import { bindActionCreators } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

const store = InAppPurchase2;

interface ReduxStateProps {
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
});

interface ReduxDispatchProps {
  getProducts: (products: IAPProducts) => Promise<void>;
  removeAds: () => Promise<void>;
  upgradePremium: () => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  getProducts: actions.flags.getProducts,
  removeAds: actions.flags.removeAds,
  upgradePremium: actions.flags.upgradePremium
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps

export const InAppPurchaseContainer = ({ getProducts, removeAds , history, upgradePremium}: Props): ReactElement => {

  // in app purchase
  useEffect(() => {
    console.log('IAP')
    // store.verbosity = InAppPurchase2.DEBUG;
    store.register({
      id: 'removeAdsSub',
      type: InAppPurchase2.PAID_SUBSCRIPTION,
    })
    store.register({
      id: 'PA',
      type: InAppPurchase2.PAID_SUBSCRIPTION,
    })


    // Run some code only when the store is ready to be used
    store.ready(() =>  {
      getProducts(store.products)
    });

    store.when("PA").updated((product: IAPProduct) => {
      if (product.owned)
        upgradePremium()
      else
          console.log('unowned')     
    });

    store.when('PA')
     .approved((p: IAPProduct) => p.verify())
     .verified((p: IAPProduct) => p.finish())
     .owned((p: IAPProduct) => {
      if (p.owned) {
        upgradePremium()
        if(history.location.pathname !== '/onboarding') {
          history.push('/home')
        }
      }
     });


    store.when("removeAdsSub").updated((product: IAPProduct) => {
      if (product.owned)
          removeAds()
      else
          console.log('unowned')     
    });

    store.when('removeAdsSub')
     .approved((p: IAPProduct) => p.verify())
     .verified((p: IAPProduct) => p.finish())
     .owned((p: IAPProduct) => {
      if (p.owned) {
        removeAds();
        console.log('purchase complete')
      }
     });

    store.error(() => {
      console.log('error store')
    })

    store.refresh();
  }, [])

  return (<></>)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InAppPurchaseContainer))