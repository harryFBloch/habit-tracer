import React, { ReactElement, useEffect, useState } from 'react';
import { IonPage, IonContent, IonSlides, IonSlide, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import classes from './Onboarding.module.css';
import Premium from '../components/common/Premium';
import OBOne from '../images/OB1.jpeg';
import OBTwo from '../images/OB2.jpeg';
import OBThree from '../images/OB3.jpeg';
import Login from './Login';
import { RootState } from '../store';
import { connect } from 'react-redux';

interface ReduxStateProps {
  premium: boolean;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  premium: state.flags.premium,
});


export const Onboarding = ({ premium }: ReduxStateProps): ReactElement => {

  const [firstSlides, setFirstSlides] = useState(true);
  console.log(premium,'onbobarding')

  return (
    <IonPage>
      <IonContent>
        {premium && 
          <IonSlides pager className={classes.slides}>
            <IonSlide className={classes.slide}>
              <div>
                <img src={OBOne} alt="onboarding screenshot"/>
              </div>
            </IonSlide>

            <IonSlide className={classes.slide}>
              <div>
                <img src={OBTwo} alt="onboarding screenshot"/>
              </div>
            </IonSlide>

            <IonSlide className={classes.slide}>
              <div>
              <img src={OBThree} alt="onboarding screenshot"/>
              </div>
            </IonSlide>

            <IonSlide className={classes.slide}>
              <Login />
            </IonSlide> 
        </IonSlides>
        }
        {!premium && 
          <>
            {firstSlides &&
              <IonSlides pager className={classes.slides}>
                <IonSlide className={classes.slide}>
                  <div>
                    <img src={OBOne} alt="onboarding screenshot"/>
                  </div>
                </IonSlide>

                <IonSlide className={classes.slide}>
                  <div>
                    <img src={OBTwo} alt="onboarding screenshot"/>
                  </div>
                </IonSlide>

                <IonSlide className={classes.slide}>
                  <Premium onNext={() => setFirstSlides(false)}/>
                </IonSlide> 
              </IonSlides>
            }

            {!firstSlides && 
              <IonSlides pager className={classes.slides}>
                <IonSlide className={classes.slide}>
                  <div>
                  <img src={OBThree} alt="onboarding screenshot"/>
                  </div>
                </IonSlide>

                <IonSlide className={classes.slide}>
                  <Login />
                </IonSlide> 
              </IonSlides>
              }
          </>
          }
      </IonContent>
    </IonPage>
  )
}

export default connect(mapStateToProps)(Onboarding);