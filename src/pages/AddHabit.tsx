import React, { ReactElement, useState, useEffect } from 'react';
import { IonPage, IonInput, IonButton, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { connect } from 'react-redux';
import classes from './AddHabit.module.css'
import { WEEKDAYS, RootState, ThunkDispatchType, Habit, actions, Habits } from '../store';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import Toolbar from '../components/common/Toolbar';
import { title } from 'process';

interface ReduxStateProps {
  habits: Habits
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  habits: state.habits
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  addNewHabit: (habit: Habit) => Promise<void>;
  updateHabit: (habit: Habit) => Promise<void>;
  showInterstitional: () => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  addNewHabit: actions.habits.newHabit,
  updateHabit: actions.habits.updateHabit,
  showInterstitional: actions.flags.showInterAd,
}, dispatch);

interface MatchParams {
  habitID?: string;
}
interface MatchProps extends RouteComponentProps<MatchParams>{}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & MatchProps


export const AddHabit = ({ addNewHabit, history, habits, match, updateHabit, showInterstitional }: Props): ReactElement => {

  const [selectedTime, setSelectedTime] = useState('');
  const [weekdays, setWeekdays] = useState([0,1,2,3,4,5,6]);
  const [habitName, setHabitName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (match.params.habitID) {
      const habitID = Number(match.params.habitID);
      const habit = habits[habitID];
      setSelectedTime(habit.time);
      setWeekdays(habit.weekdays);
      setHabitName(habit.title);
      setMessage(habit.message);
    }
  }, [match, habits])

  const setNotifiaction = (weekday: number): void => {
    const timeArray = selectedTime.split('T')[1].split(':')
      if (timeArray) {
        LocalNotifications.schedule({
          id: habits.length * 10 + weekday,
          title: `TIME TO ${habitName}`,
          trigger: {every: { weekday: weekday, hour: Number(timeArray[0]), minute: Number(timeArray[1])}, count: 365}
        })
      }
  }

  const resetState = (): void => {
    setHabitName('');
    setMessage('');
    setWeekdays([0,1,2,3,4,5,6]);
    setSelectedTime('');
  }

  const handleSaveHabit = (): void => {
    weekdays.forEach((weekday) => setNotifiaction(weekday))
    const habit: Habit = {
      notificatiions: weekdays,
      title: habitName,
      id: match.params.habitID ? Number(match.params.habitID) : habits.length,
      time: selectedTime,
      message: message,
      datesCompleted: [],
      dateCreated: Date.now(),
      weekdays: weekdays
    }
    match.params.habitID ? updateHabit(habit) : addNewHabit(habit);
    showInterstitional();
    resetState();
  }
  
  return (
    <IonPage>
      <Toolbar back/>
      <div className={classes.formContainer}>
        <div className={classes.border}>
          <IonItem lines="full">
            <IonLabel position="floating">Habit Name:</IonLabel>
            <IonInput value={habitName} onIonChange={(e) => setHabitName(e.detail.value!)}/>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="floating">Message:</IonLabel>
            <IonInput value={message} onIonChange={(e) => setMessage(e.detail.value!)}/>
          </IonItem>

        <IonItem className={classes.fullWidth} lines="full">
          <IonLabel>Weekdays</IonLabel>
          <IonSelect value={weekdays} multiple={true} cancelText="Cancel" okText="Okay!" onIonChange={e => setWeekdays(e.detail.value)} selectedText="">
            <IonSelectOption value={WEEKDAYS.Monday}>Monday</IonSelectOption>
            <IonSelectOption value={WEEKDAYS.Tuesday}>Tuesday</IonSelectOption>
            <IonSelectOption value={WEEKDAYS.Wednesday}>Wednesday</IonSelectOption>
            <IonSelectOption value={WEEKDAYS.Thursday}>Thursday</IonSelectOption>
            <IonSelectOption value={WEEKDAYS.Friday}>Friday</IonSelectOption>
            <IonSelectOption value={WEEKDAYS.Saterday}>Saturday</IonSelectOption>
            <IonSelectOption value={WEEKDAYS.Sunday}>Sunday</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem className={classes.fullWidth} lines="full">
          <IonLabel>Reminder Time</IonLabel>
          <IonDatetime displayFormat="h:mm A" cancelText="Remove Reminder"
          value={selectedTime} onIonChange={e => setSelectedTime(e.detail.value!)} 
          onIonCancel={() => setSelectedTime('')}/>
        </IonItem>
        </div>
        <IonButton onClick={handleSaveHabit} className={classes.saveButton} routerLink="/home" routerDirection="none"
          disabled={selectedTime === '' || title === '' || message === '' || weekdays.length === 0} >
          Save
        </IonButton>
      </div>
    </IonPage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHabit)