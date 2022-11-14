import { IonPage, IonButton, IonIcon, IonText, IonContent } from '@ionic/react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import firebase from '../config/FirebaseConfig';
import 'firebase/analytics';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import classes from './Home.module.css';
import { RootState, ThunkDispatchType, Habits, actions, Habit, Stat } from '../store';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { arrowUndoCircle, addOutline, checkmarkDone, cog} from 'ionicons/icons';
import Toolbar from '../components/common/Toolbar';
import { randomQuote } from '../quotes';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2';
import { getTotalHabitsCompleted, getTodaysPercentage } from '../utils/Dates';
import { Challenges } from '../store/challenge/types';
import { ButtonWithButtons } from '../components/common/ButtonWithButtons';
import Rating from '../components/common/Rating';

interface ReduxStateProps {
  habits: Habits;
  removeAds: boolean;
  products: IAPProduct[];
  stats: Stat;
  challenges: Challenges;
  premium: boolean;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  habits: state.habits,
  removeAds: state.flags.removeAds,
  products: state.flags.products,
  stats: state.stats.stats,
  challenges: state.challenges,
  premium: state.flags.premium,
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  getHabits: () => Promise<void>;
  deleteHabit: (habit: Habit) => Promise<void>;
  getStats: () => Promise<boolean>;
  completeHabit: (habit: Habit) => Promise<void>;
  unCompleteHabit: (habit: Habit) => Promise<void>;
  showInter: () => Promise<void>;
  subscribe: (productID: string) => Promise<string>;
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

const Home = ({getHabits, habits, deleteHabit, getStats, completeHabit, unCompleteHabit, showInter, removeAds, products, stats, history, challenges, premium}: Props): ReactElement => {

  const [quote, setQuote] = useState({author: '', quote: ''})

  useEffect(() => {
    getHabits()
    .then(() => {
      getStats()
      .then((firstLogin) => {
        
      })
    })
    setQuote(randomQuote())
  }, [getHabits, getStats])

    useEffect(() => {
      Rating(() => {});
    }, [])

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

  const renderChallenges = (): ReactElement => {

    return (
      <>
        <IonText color="primary">Challenges</IonText>
        <div className={classes.collectionContainer}>
          {challenges.challenges.map((challenge, index) => {
            return (
              <IonButton color="secondary" className={classes.collectionButton} routerLink={`/challenge/${index}`} key={index}>
                {challenge.name}
              </IonButton>
            )
          })}

        </div>
      </>
    )
  }
  
  const renderHabitCollection = (): ReactElement => {
    const sortedHabitKeys = Object.keys(habits).sort((a, b) => new Date(habits[a].time).getTime() - new Date(habits[b].time).getTime())

    return (
      <>
      <IonText color="primary">Personal Habits</IonText>
      <div className={classes.collectionContainer}>
        {sortedHabitKeys.map(sortedKey => renderHabit(habits[sortedKey]))}
      </div>
      </>
    )
  }

  const renderHabit = (habit: Habit): ReactElement => {
    let completedToday = false

    //check if completed
    if (habit.datesCompleted && habit.datesCompleted.length > 0) {
      completedToday = datesAreOnSameDay(new Date(habit.datesCompleted[habit.datesCompleted.length - 1]), new Date())
    }

    return (
        <ButtonWithButtons text={habit.title} color={completedToday ? 'success' : 'danger'} className={classes.habitButton} key={habit.id}
        rightButton={
          <IonButton size="small" 
          onClick={!completedToday ? () => {completeHabit(habit)} : () => {unCompleteHabit(habit)}}
          className={classes.habitIconButton}><IonIcon icon={completedToday ? arrowUndoCircle : checkmarkDone} className={classes.habitIcon}/></IonButton>} 
        leftButton={
          <IonButton size="small" className={classes.habitIconButton} routerLink={`/edit_habit/${habit.id}`}><IonIcon icon={cog} className={classes.habitIcon}/></IonButton>}/>
    )
  }

  const todaysPercent = getTodaysPercentage(stats);
  const totalStats = getTotalHabitsCompleted(stats);

  return (
    <IonPage>
      <Toolbar rightButtons={<IonButton routerDirection="forward" 
        onClick={() => { premium || Object.keys(habits).length <= 2 ? history.push('/add_habit') : history.push('/premium')}}>
          <IonIcon slot="icon-only" icon={addOutline}/>
        </IonButton>}/>
      <IonContent>
        <div className={classes.pageContainer}>
        <div className={classes.buttonContainer}>
            {products[0] && !removeAds &&
              <IonButton className={classes.productButton} routerDirection="forward"
                color="primary" routerLink="/premium">
                Upgrade To Premium!
              </IonButton>
            }
          </div>
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
          {renderChallenges()}
          {habits && Object.keys(habits).length > 0 && renderHabitCollection()}
          {Object.keys(habits).length === 0 &&
            <IonButton color="primary" className={classes.button} routerDirection="forward"
            onClick={() => {history.push('/add_habit')}}>
              Add New Habbit
            </IonButton>
          }
          {Object.keys(stats).length > 1 &&
            
            <div className={classes.statsContainer}>
              <div className={classes.progressContainer}>
                <h5 className={classes.progressTitle}>Habits Completed Today</h5>
                <CircularProgressbar value={todaysPercent} text={`${todaysPercent}%`} />
              </div>
              <div className={classes.progressContainer}>
                <h5 className={classes.progressTitle}>Total Habits Completed</h5>
                <CircularProgressbar minValue={0} maxValue={totalStats.total} value={totalStats.completedTotal} text={`${totalStats.completedTotal}`} />
              </div>
            </div>
            }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
