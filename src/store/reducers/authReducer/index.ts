import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppDispatch, RootState } from 'store';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '921313565693-9gpu1lsv8tip1ghhsondqpgjau4tc7ag.apps.googleusercontent.com',
});

interface AuthState {
  user: FirebaseAuthTypes.UserCredential | any;
  error: {
    login: any;
    register: any;
    logOut: any;
  };
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: {
    login: null,
    register: null,
    logOut: null,
  },
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

export const { requesting, googleAuthFailed, googleAuthSuccess, updateUser } =
  authSlice.actions;
export const authSelector = (state: any): RootState['auth'] => state.auth;
export default authSlice.reducer;
