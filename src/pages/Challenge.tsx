import React, { ReactElement, useEffect, useState} from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonPage, IonSegment, IonSegmentButton, IonText, IonToggle } from '@ionic/react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Premium from '../components/common/Premium';
import Toolbar from '../components/common/Toolbar';
import { actions, Challenge, Challenges, ChallengeStats, RootState, ThunkDispatchType, notificationsTemplate, ChallengeNotifications, ChallengeNotif, ChallengeStat, ChallengeDay } from '../store';
import classes from './Challenge.module.css';
import { addCircle, removeCircle, trophySharp } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import Loading from '../components/common/Loading';
import { randomShortQuote } from '../quotes';

interface ReduxStateProps {
  challengeStats: ChallengeStats;
  challenges: Challenges;
  premium: boolean;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  challengeStats: state.challenges.challengeStats,
  challenges: state.challenges,
  premium: state.flags.premium
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  getChallengeStat: (challengeID: number) => Promise<ChallengeStat>;
  updateSettingsForChallenge: (challengeID: number, settings: ChallengeStat) => Promise<void>;
  getDayStat: (challengeID: number) => Promise<ChallengeDay>;
  updateDayStat: (challengeID: number, daystats: ChallengeDay, newLevel: string, newDaysCompletd: number) => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  getChallengeStat: actions.challenges.getChallengeStat,
  updateSettingsForChallenge: actions.challenges.updateChallengeSettings,
  getDayStat: actions.challenges.getTodaysStatsForChallenge,
  updateDayStat: actions.challenges.updateProgress,
}, dispatch);

interface MatchParams {
  challenge: string;
}

interface MatchProps extends RouteComponentProps<MatchParams>{}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & MatchProps & RouteComponentProps

export const ChallengeView = ({ challenges, match, challengeStats, updateSettingsForChallenge, getChallengeStat, getDayStat, updateDayStat, premium, history }: Props): ReactElement => {

  const challengeID = Number(match.params.challenge);

  const [challengeStat, setChallengeStat] = useState({} as ChallengeStat);
  const [todayStat, setTodayStat] = useState({} as ChallengeDay)
  const [settings, setSettings] = useState('challenge');
  const [goal, setGoal] = useState(1);
  const [notifications, setNotifications] = useState({} as ChallengeNotifications);
  const challenge = challenges.challenges[challengeID];

  useEffect((): void => {
    if(challengeStats[challengeID]) {
      setChallengeStat(challengeStats[challengeID]);
      setNotifications(challengeStats[challengeID].settings.notifications);
      setGoal(Number(challengeStats[challengeID].settings.goal))
      getDayStat(challengeID)
      .then(stat => setTodayStat(stat))
    } else {
      getChallengeStat(challengeID)
      .then((challengeStats: ChallengeStat) => {
        console.log('break', challengeStats)
        setChallengeStat(challengeStats);
        setNotifications(challengeStats.settings.notifications);
        setGoal(Number(challengeStats.settings.goal))
        getDayStat(challengeID)
        .then(stat => setTodayStat(stat))
      })
    }
  }, [challengeID, challengeStats, getChallengeStat])

  const removeNotifiactionsForChallenge = (id: number, callback: () => void) => {
    for (let i = 0; i < 24; i++) {
      LocalNotifications.cancel(((id * 100) + i) * -1)
      .then(() => {
       if (i === 23 && callback) {
         callback();
       }
      })
    }
  }

  const setNotifiaction = (notif: ChallengeNotif, notifID: number): void => {
      if (notif.active) {
        const pmSplit = notif.time.split(' ')
        const timeArray = pmSplit[0].split(':');
        LocalNotifications.schedule({
          id: ((challengeID * 100) + notifID) * -1,
          title: `TIME TO ${challenge.label}`,
          trigger: {every: {hour: pmSplit[1] === 'pm' ? Number(timeArray[0]) + 12 : Number(timeArray[0]), minute: Number(timeArray[1])}, count: 365}
        })
      }
  }

  const nextLevel = (): string => {
    switch (challengeStat.level) {
      case 'Bronze':
        return 'Silver';
      case 'Silver':
        return 'Gold';
      case "Gold":
        return "Gold";
    
      default:
        return 'Bronze';
    }
  }

  const handleAddToGoal = (): void => {
    const newProgress = todayStat.progress + 1;
    let completed = false;
    let newDaysCompleted = challengeStat.daysCompleted;
    let newLevel = challengeStat.level;
    if (newProgress >= goal) {
      completed = true;
      newDaysCompleted += 1;
    }
    if (newDaysCompleted === 7) {
      newDaysCompleted = 0
      newLevel = nextLevel();
      setChallengeStat({...challengeStat, level: newLevel})
    }
    setChallengeStat({...challengeStat, daysCompleted: newDaysCompleted});

    setTodayStat({progress: newProgress, completed: false});
    setTimeout(() => {setTodayStat({progress: newProgress, completed: completed})}, 1100)
    updateDayStat(challengeID, {progress: newProgress, completed: completed}, newLevel, newDaysCompleted);
  }

  // settings: {goal?: number, notifications: {[notificationID: number]: {time: string, active: boolean}}},
  const handleSaveSettings = (): void => {
    removeNotifiactionsForChallenge(challengeID, () => {
      updateSettingsForChallenge(challengeID, {
        level: challengeStat.level,
        phase: challengeStat.phase,
        settings: { goal: goal, notifications: notifications},
        stats: challengeStat.stats,
        daysCompleted: challengeStat.daysCompleted,
      })
      Object.keys(notifications).map((notifID) => setNotifiaction(notifications[Number(notifID)], Number(notifID)));
      setSettings('challenge');
    })
  }

  const renderSettings = (): ReactElement => {

    const renderNotif = (notifID: number): ReactElement => (
      <IonItem lines="none" key={notifID}>
        <IonLabel slot="start">{notifications[notifID].time}</IonLabel>
        <IonToggle slot="end" checked={notifications[notifID].active} onClick={() => setNotifications({...notifications, [notifID]: {...notifications[notifID], active: !notifications[notifID].active}})}/>
      </IonItem>
    )

    return (
      <div className={classes.settingsContainer}>
        <IonItem lines="none">
          <IonLabel slot="start">{challenge.label} per day</IonLabel>
          <IonButton slot="end" onClick={() => setGoal(goal - 1)}><IonIcon icon={removeCircle}/></IonButton>
          <IonText slot="end">{goal}</IonText>
          <IonButton slot="end" onClick={() => setGoal(goal + 1)}><IonIcon icon={addCircle}/></IonButton>
        </IonItem>
        <IonListHeader>Notifications</IonListHeader>
        {Object.keys(notifications).map(notifKey => renderNotif(Number(notifKey)))}
      </div>
    )
  }

  const renderChallenges = (challenge: Challenge): ReactElement => {
    console.log(challenge,'TODAY')
    return (
      <div className={classes.challengeContainer}>
        <div className={classes.block}>
          <h1 color="primary" className={classes.block}>
            {challenge.name}
          </h1>

          {!todayStat.completed && 
          <>
            <div className={classes.progressContainer} >
              <CircularProgressbarWithChildren maxValue={goal} value={todayStat.progress}>
                <div className={classes.circleText}>
                  {challenge.label ? `${todayStat.progress} ${challenge.label}` : randomShortQuote()}
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <IonButton className={`${classes.block} ${classes.topMarg}`} onClick={handleAddToGoal}>
              {goal === 1 ? "+ Finish" : `+1 ${challenge.label}`}
            </IonButton>
          </>}

          {todayStat.completed && 
          <>
            <div>
              <IonIcon icon={trophySharp} className={`${classes.trophy} ${classes.fadeIn}`}/>
            </div>
            <h2 color="primary" className={`${classes.block} ${classes.fadeIn}`}>Complete for Today!!!</h2>
          </>
          }

        </div>
        

        <div>
          <div className={classes.statsContainer}>
            <div className={classes.statContainer}>
              <IonText className={classes.stat}>{7 - challengeStat.daysCompleted}</IonText>
              <p className={classes.statTitle}>days left</p>
            </div>
            <div className={classes.statContainer}>
              <IonText className={classes.stat}>{challengeStat.daysCompleted}</IonText>
              <p className={classes.statTitle}>
                days completed
              </p>
            </div>
            <div className={classes.statContainer}>
              <IonText className={classes.stat}>{challengeStat.level}</IonText>
              <p className={classes.statTitle}>
                current level
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <IonPage>
      <IonContent>
        {!premium && <Premium onNext={() => history.push('/')}/>}

        {premium && <>
        <Toolbar back rightButtons={<>
          {settings === 'settings' && 
          <IonButton onClick={handleSaveSettings}>Save</IonButton>}
        </>}/>
          <IonSegment onIonChange={e => setSettings(String(e.detail.value))} value={settings}>
          <IonSegmentButton value="challenge" defaultChecked={true}>
            <IonLabel>Challenge</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="settings">
            <IonLabel>Settings</IonLabel>
          </IonSegmentButton>
        </IonSegment>
          {!todayStat && <Loading/>}
          {settings === 'settings' && renderSettings()}
          {settings !== 'settings' && todayStat && renderChallenges(challenges.challenges[challengeID])}
        </>}
      </IonContent>
    </IonPage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeView);