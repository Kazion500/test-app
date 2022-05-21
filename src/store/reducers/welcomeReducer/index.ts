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
    clearData: state => {
      state.data = null;
      state.error = null;
    },
  },
});

export const saveData = (data: Detail) => async (dispatch: AppDispatch) => {
  try {
    const userData = await firestore().collection('Users').add(data);
    dispatch(welcomeSuccess(userData));
  } catch (error) {
    dispatch(welcomeFailed(JSON.stringify(error)));
  }
};

export const getData = () => async (dispatch: AppDispatch) => {
  try {
    await firestore()
      .collection('Users')
      .onSnapshot(({ docs }) => {
        dispatch(infoSuccess(docs));
      });
  } catch (error) {
    dispatch(infoFailed(JSON.stringify(error)));
  }
};

export const {
  welcomeFailed,
  welcomeSuccess,
  infoSuccess,
  infoFailed,
  clearData,
} = authSlice.actions;
export const welcomeSelector = (state: any): RootState['welcome'] =>
  state.welcome;
export default authSlice.reducer;
