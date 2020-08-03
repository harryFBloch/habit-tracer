import { IonPage, IonButton, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonList, IonText } from '@ionic/react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import classes from './Home.module.css';
import { RootState, ThunkDispatchType, Habits, actions, Habit } from '../store';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import {checkmarkCircle, hammerOutline, trashBinOutline, arrowUndoCircle, addOutline, time} from 'ionicons/icons';
import Toolbar from '../components/common/Toolbar';
import { randomQuote } from '../quotes';

interface ReduxStateProps {
  habits: Habits;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  habits: state.habits
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  getHabits: () => Promise<void>;
  deleteHabit: (habit: Habit) => Promise<void>;
  getStats: () => Promise<void>;
  completeHabit: (habit: Habit) => Promise<void>;
  unCompleteHabit: (habit: Habit) => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  getHabits: actions.habits.getHabits,
  deleteHabit: actions.habits.deleteHabit,
  getStats: actions.stats.getStats,
  completeHabit: actions.habits.completeHabit,
  unCompleteHabit: actions.habits.unCompleteHabit,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps

const Home = ({getHabits, habits, deleteHabit, getStats, completeHabit, unCompleteHabit}: Props): ReactElement => {

  const [quote, setQuote] = useState({author: '', quote: ''})

  useEffect(() => {
    getHabits()
    getStats()
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
          }}>
            <IonIcon slot="icon-only" icon={checkmarkCircle}/>
        </IonItemOption>}

      {completedToday && 
        <IonItemOption color="secondary" 
        onClick={() => {
          unCompleteHabit(habit)
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

  const sortedHabits = habits.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
  
  return (
    <IonPage>
      <Toolbar rightButtons={<IonButton routerLink="/add_habit" routerDirection="none">
          <IonIcon slot="icon-only" icon={addOutline}/>
        </IonButton>}/>
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
        {habits && habits.length > 0 &&
          <IonList ref={listRef} className={classes.listContainer}>  
            {sortedHabits.map((habit) => !habit.deleted && renderHabit(habit))}
          </IonList>
        }
        {habits.length === 0 &&
          <IonButton color="primary" className={classes.button} routerLink="/add_habit" routerDirection="none">
            Add New Habbit
          </IonButton>
        }
      </div>
    </IonPage>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
