import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppDispatch, RootState } from 'store';
import { firebase } from '@react-native-firebase/firestore';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId: 'webClientId',
});

interface AuthState {
  user: FirebaseAuthTypes.UserCredential | any;
  error: {
    fcmToken: any;
    register: any;
    logOut: any;
  };
  isLoading: boolean;
  fcmToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: {
    fcmToken: null,
    register: null,
    logOut: null,
  },
  fcmToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requesting: state => {
      state.isLoading = true;
    },
    googleAuthSuccess: (
      state,
      action: PayloadAction<FirebaseAuthTypes.UserCredential | any>,
    ) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    googleAuthFailed: (state, action: PayloadAction<any>) => {
      state.error.register = action.payload;
      state.isLoading = false;
    },
    saveFcmTokenSuccess: (
      state,
      action: PayloadAction<FirebaseAuthTypes.UserCredential | any>,
    ) => {
      state.fcmToken = action.payload;
      state.isLoading = false;
    },
    saveFcmTokenFailed: (state, action: PayloadAction<any>) => {
      state.error.fcmToken = action.payload;
      state.isLoading = false;
    },
    updateUser: (
      state,
      action: PayloadAction<FirebaseAuthTypes.UserCredential | any>,
    ) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export const signInWithGoogle = () => async (dispatch: AppDispatch) => {
  dispatch(requesting());
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCreds = await auth().signInWithCredential(googleCredential);
    dispatch(googleAuthSuccess(JSON.stringify(userCreds)));
  } catch (error) {
    dispatch(googleAuthFailed(JSON.stringify(error)));
  }
};

export const saveFCMToken =
  (data: { token: string }) => async (dispatch: AppDispatch, state: any) => {
    const user = state().auth?.user;
    console.log('user', user?.uid);

    dispatch(requesting());
    try {
      const fcmToken = await firebase
        .firestore()
        .collection('fcmTokens')
        .doc(user?.uid)
        .set(data);

      dispatch(saveFcmTokenSuccess(JSON.stringify(fcmToken)));
    } catch (error) {
      dispatch(saveFcmTokenFailed(JSON.stringify(error)));
    }
  };

export const {
  requesting,
  googleAuthFailed,
  googleAuthSuccess,
  updateUser,
  saveFcmTokenFailed,
  saveFcmTokenSuccess,
} = authSlice.actions;
export const authSelector = (state: any): RootState['auth'] => state.auth;
export default authSlice.reducer;
