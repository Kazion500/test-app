import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'store';
import firestore from '@react-native-firebase/firestore';

type Detail = {
  fullName: string;
  age: string;
};

interface WelcomeState {
  error: any;
  isLoading: boolean;
  data: Detail | Detail[] | null;
  info: {
    _data: Detail;
  }[];
}

const initialState: WelcomeState = {
  error: null,
  isLoading: true,
  data: null,
  info: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    welcomeSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    welcomeFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    infoSuccess: (state, action: PayloadAction<any>) => {
      state.info = action.payload;
      state.isLoading = false;
    },
    infoFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const saveData = (data: Detail) => async (dispatch: AppDispatch) => {
  try {
    const userData = await firestore().collection('Users').add(data);
    console.log({ userData });

    dispatch(welcomeSuccess(userData));
  } catch (error) {
    console.log('error', error);

    dispatch(welcomeFailed(JSON.stringify(error)));
  }
};

export const getData = () => async (dispatch: AppDispatch) => {
  try {
    const users = (await firestore().collection('Users').get()).docs;
    dispatch(infoSuccess(users));
  } catch (error) {
    dispatch(infoFailed(JSON.stringify(error)));
  }
};

export const { welcomeFailed, welcomeSuccess, infoSuccess, infoFailed } =
  authSlice.actions;
export const welcomeSelector = (state: any): RootState['welcome'] =>
  state.welcome;
export default authSlice.reducer;
