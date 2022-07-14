import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { AdOptions } from '@capacitor-community/admob';
import { AdMobBannerIOS, AdMobIntersitionalIOS } from '../../config/FirebaseConfig';
import { bindActionCreators } from 'redux';
import { ThunkDispatchType, RootState } from '../../store';

const { AdMob } = Plugins;

interface ReduxStateProps {
  removeAds: boolean;
  pauseAds: boolean;
  loggedIn: string;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  removeAds: state.flags.removeAds,
  pauseAds: state.flags.pauseAds,
  loggedIn: state.auth.uid
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
}, dispatch);

interface parrentProps {
  top: boolean
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & parrentProps


export const AdMobContainer = ({removeAds, top, pauseAds, loggedIn}: Props): ReactElement => {

  useEffect(() => {
    if (!removeAds && !pauseAds && loggedIn) {
      AdMob.initialize();
      const addID = {
        ios: AdMobBannerIOS,
        iosInter: AdMobIntersitionalIOS, 
        android: '',
        andridInter: '',
      }

      const platformAdIdBanner = isPlatform('android') ? addID.android : addID.ios;

      const bannerOptions: AdOptions = {
        adId: platformAdIdBanner,
      }

      AdMob.showBanner(bannerOptions)
    } else {
      AdMob.hideBanner()
    }
  
  }, [removeAds, pauseAds])

  return (<></>)
}

export default connect(mapStateToProps)(AdMobContainer)