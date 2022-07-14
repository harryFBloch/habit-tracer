import { ThunkResult, ThunkDispatchType } from '../types';
import { ActionType } from '../actionTypes';
import firebase from '../../config/FirebaseConfig';
import { auth } from 'firebase';
import 'firebase/database';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple';

import { RootState } from '..';

export const signUp = (email: string, password: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType ): Promise<void> => {
  return  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((data) => {
    if (data.user) {
      dispatch({type: ActionType.LOGIN_SUCCESSFUL, uid: data.user.uid})
      Promise.resolve();
    }
  })
  .catch((error) => Promise.reject(error))
};


export const appleLogin = (): ThunkResult<Promise<void | object>> =>
async ( dispatch: ThunkDispatchType ): Promise<void | object> => {
  return SignInWithApple.signin({
    requestedScopes: [
      ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
      ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
    ]
  })
  .then((res: AppleSignInResponse) => {
    let provider = new auth.OAuthProvider('apple.com');
    const credentials = provider.credential({idToken: res.identityToken})
    return firebase.auth().signInWithCredential(credentials)
    .then((data) => {
        console.log('apple-firebase-success')
        if (data.user) {
          dispatch({type: ActionType.LOGIN_SUCCESSFUL, uid: data.user.uid})
          return Promise.resolve()
        } 
        return Promise.reject('apple reject');
    })
    .catch((error) => {
      console.log("Error", error)
      return Promise.reject(error);
    })
  })
  .catch((error: AppleSignInErrorResponse) => {
    alert(error.code + ' ' + error.localizedDescription);
    console.error(error);
    return Promise.reject(error);
  });
};

export const login = (email: string, password: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType ): Promise<void> => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((data) => {
    if (data.user) {
      dispatch({type: ActionType.LOGIN_SUCCESSFUL, uid: data.user.uid})
    }
  })
  .catch((error) => {
    console.log("Error", error)
    return Promise.reject(error);
  })
};

export const autoLoginSuccess = (uid: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType): Promise<void> => {
  dispatch({type: ActionType.LOGIN_SUCCESSFUL, uid: uid});
}

export const autoLoginFailed = (): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType): Promise<void> => {
  dispatch({type: ActionType.AUTO_LOGIN_FAILED});
}

export const registerUsername = (username: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<void> => {
  const uid = getState().auth.uid
  // firebase.database().ref(`/usernames/${uid}`).set(username)
  return firebase.database().ref(`/users/${uid}/username`).set(username)
  .then((data) => {
    dispatch({type: ActionType.USERNAME_SUCCESS, username: username})
    
    Promise.resolve()
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

export const getUsername = (): ThunkResult<Promise<object>> =>
async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<object> => {
  return firebase.database().ref(`/users/${getState().auth.uid}/username`).once('value')
  .then((data): object => {
    const value = data.val();
    if (value) {
      dispatch({type: ActionType.USERNAME_SUCCESS, username: data.val()})
      return Promise.resolve({})
    } else {
      return Promise.reject({error: 'invalid-username'})
    }
  })
  .catch((error): object => {
    console.log(error)
    return Promise.reject({error: 'firebase error'})
  });
}

export const resetPassword = (email: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType ): Promise<void> => {
  return  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    dispatch({type: ActionType.PASSWORD_RESET_SUCCESS})
    Promise.resolve();
  })
  .catch((error): void => console.log("Error", error))
};

export const logout = () => {
  firebase.auth().signOut();
}