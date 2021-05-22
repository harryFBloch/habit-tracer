import { IonContent, IonPage } from '@ionic/react'
import React, { ReactElement, useEffect} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Premium from '../components/common/Premium'
import Toolbar from '../components/common/Toolbar'
import { actions, ThunkDispatchType } from '../store';


// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  togglePauseAds: () => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  togglePauseAds: actions.flags.togglePauseAds,
}, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>

export const PremiumView = ({ togglePauseAds }: Props): ReactElement => {
  
  useEffect(() => {
    togglePauseAds()
  }, [])

return (
  <IonPage>
    <IonContent>
      <Toolbar back backOnClick={() => togglePauseAds()}/>
      <Premium />
    </IonContent>
  </IonPage>
  )
}

export default connect(null, mapDispatchToProps)(PremiumView)