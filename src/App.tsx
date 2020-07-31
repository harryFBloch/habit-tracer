import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import firebase from './config/FirebaseConfig';
import 'firebase/auth';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';
import AddHabit from './pages/AddHabit';
import { Provider } from 'react-redux';
import store, { actions } from './store';
import LeftMenu  from './components/LeftMenu';
import AdMobContainer from './components/common/AdMobContainer';
import InterAd from './components/common/InterAd';
import InAppPurchase from './components/common/InAppPurchase';
import { PublicRoute, PrivateRoute} from './utils/routing';
import Login from './pages/Login';
import './App.css'


const App: React.FC = () => {
  useEffect((): void => {
    //check auth status
    firebase.auth().onAuthStateChanged((user): void => {
      if (user) {
        actions.auth.autoLoginSuccess(user.uid)(store.dispatch, store.getState, null);
        if (window.location.pathname === '/login'){
          window.location.assign('/home')
        }
      } else {
        actions.auth.autoLoginFailed()(store.dispatch, store.getState, null);
      }
    })
    }, [])

  return (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
      <IonContent id="main" forceOverscroll={false}>
        <AdMobContainer />
        {/* <InterAd /> */}
        <InAppPurchase />
        <LeftMenu />
        <IonRouterOutlet id="main">
          <PrivateRoute path="/home" component={Home} exact={true} />
          <PrivateRoute path="/add_habit" component={AddHabit} exact={true} />
          <PrivateRoute path="/edit_habit/:habitID" component={AddHabit} />
          <PublicRoute path="/login" component={Login} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  </Provider>
)};

export default App;
