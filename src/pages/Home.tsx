import { IonPage, IonButton, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonList, IonText, IonContent } from '@ionic/react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import firebase from '../config/FirebaseConfig';
import 'firebase/analytics';
import classes from './Home.module.css';
import { RootState, ThunkDispatchType, Habits, actions, Habit, Stat } from '../store';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import {checkmarkCircle, hammerOutline, trashBinOutline, arrowUndoCircle, addOutline} from 'ionicons/icons';
import Toolbar from '../components/common/Toolbar';
import { randomQuote } from '../quotes';
import { IAPProduct } from '@ionic-native/in-app-purchase-2';
import LineGraph from '../components/common/LineGraph';
import { getHabitsCompleteData } from '../utils/Dates';

interface ReduxStateProps {
  habits: Habits;
  removeAds: boolean;
  products: IAPProduct[];
  stats: Stat;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  habits: state.habits,
  removeAds: state.flags.removeAds,
  products: state.flags.products,
  stats: state.stats.stats,
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  getHabits: () => Promise<void>;
  deleteHabit: (habit: Habit) => Promise<void>;
  getStats: () => Promise<boolean>;
  completeHabit: (habit: Habit) => Promise<void>;
  unCompleteHabit: (habit: Habit) => Promise<void>;
  showInter: () => Promise<void>;
  subscribe: (productID: string) => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  getHabits: actions.habits.getHabits,
  deleteHabit: actions.habits.deleteHabit,
  getStats: actions.stats.getStats,
  completeHabit: actions.habits.completeHabit,
  unCompleteHabit: actions.habits.unCompleteHabit,
  showInter: actions.flags.showInterAd,
  subscribe: actions.flags.subscribe
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps

const Home = ({getHabits, habits, deleteHabit, getStats, completeHabit, unCompleteHabit, showInter, removeAds, products, stats, history, subscribe}: Props): ReactElement => {

  const [quote, setQuote] = useState({author: '', quote: ''})

  useEffect(() => {
    getHabits()
    .then(() => {
      getStats()
      .then((firstLogin) => {
        if (firstLogin) {
          history.push('/onboarding')
        }
      })
    })
    setQuote(randomQuote())
  }, [getHabits, getStats])

  const listRef = useRef<HTMLIonListElement>(null)

  const closeList = (): void => {
    if (listRef.current) {
      listRef.current.closeSlidingItems()
    }
  }

  const datesAreOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const renderHabit = (habit: Habit): ReactElement => {

    let completedToday = false

    //check if completed
    if (habit.datesCompleted && habit.datesCompleted.length > 0) {
      completedToday = datesAreOnSameDay(new Date(habit.datesCompleted[habit.datesCompleted.length - 1]), new Date())
    }

    return (
    <IonItemSliding key={habit.id}>
      <IonItemOptions side="end">
        <IonItemOption onClick={() => deleteHabit(habit)} color="secondary">
          <IonIcon slot="icon-only" icon={trashBinOutline}/>
        </IonItemOption>
        <IonItemOption routerLink={`edit_habit/${habit.id}`} routerDirection="none" color="secondary">
            <IonIcon slot="icon-only" icon={hammerOutline} onClick={closeList}/>
        </IonItemOption>
      </IonItemOptions>

      <IonItemOptions side="start">

     {!completedToday &&
        <IonItemOption color="secondary"
        onClick={() => {
          completeHabit(habit);
          closeList();
          showInter();
          firebase.analytics().logEvent('habit complete for the day')
          }}>
            <IonIcon slot="icon-only" icon={checkmarkCircle}/>
        </IonItemOption>}

      {completedToday && 
        <IonItemOption color="secondary" 
        onClick={() => {
          unCompleteHabit(habit);
          closeList();
          }}>
            <IonIcon slot="icon-only" icon={arrowUndoCircle}/>
        </IonItemOption>
      }
      </IonItemOptions>

      <IonItem className={completedToday ? classes.lineThrough : ''} color="primary" lines="none">
        <IonLabel className="ion-text-center ion-text-bold" slot="start">
          {habit.title}
        </IonLabel>
        {habit.time !== '' &&
          <IonText slot="end" className={classes.timeLabel}>
            {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(habit.time))}
          </IonText>
        }
      </IonItem>
    </IonItemSliding>
    )
  }

  const sortedHabitKeys = Object.keys(habits).sort((a, b) => new Date(habits[a].time).getTime() - new Date(habits[b].time).getTime())
  
  return (
    <IonPage>
      <Toolbar rightButtons={<IonButton routerLink="/add_habit" routerDirection="none">
          <IonIcon slot="icon-only" icon={addOutline}/>
        </IonButton>}/>
      <IonContent>
        <div className={classes.pageContainer}>
          <div className={classes.quoteContainr}>
            <div className={classes.quoteInnerContainer}>
              <div className={classes.quote}>
                {quote.quote}
              </div>
              <div className={classes.quoteAuthor}>
                {quote.author}
              </div>
            </div>
          </div>
          {habits && Object.keys(habits).length > 0 &&
            <IonList ref={listRef} className={classes.listContainer}>  
              {sortedHabitKeys.map((id) => !habits[id].deleted && renderHabit(habits[id]))}
            </IonList>
          }
          {Object.keys(habits).length === 0 &&
            <IonButton color="primary" className={classes.button} routerLink="/add_habit" routerDirection="none">
              Add New Habbit
            </IonButton>
          }
          {Object.keys(stats).length > 1 &&
            <div className={classes.graphContainer}>
            <LineGraph title="" data={{Habits: {data: getHabitsCompleteData(stats), color: '#D08A4A'}}} fill={true}/>
          </div>}

          <div className={classes.buttonContainer}>
            {products[0] && !removeAds &&
              <IonButton className={classes.productButton}
                onClick={() => subscribe(products[0].id)} key={products[0].id} 
                color="primary">
                Click Here to {products[0].title} For Only {products[0].price} a {products[0].billingPeriodUnit}
              </IonButton>
            }
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
