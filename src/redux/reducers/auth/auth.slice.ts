import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { signIn, refresh } from './auth.api';

export enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface AuthState {
  status: AuthStatus;
  jwt: string;
  address: string;
}

const initialState: AuthState = {
  status: AuthStatus.IDLE,
  jwt: '',
  address: '',
};

const setLocalStorage = (jwt: string, address: string) => {
  localStorage.setItem('auth', JSON.stringify({ jwt, address }));
};
const getLocalStorage = () => {
  const data = localStorage.getItem('auth');
  return data && (JSON.parse(data) as { jwt: string; address: string });
};
export const getLocalAddress = () => {
  const data = getLocalStorage();
  return data && data.address;
};

export const signInAsync = createAsyncThunk(
  'auth/signin',
  async (props: { address: string; sig: string }) => {
    const response = await signIn(props.address, props.sig);
    setLocalStorage(response.data, props.address);
    return { jwt: response.data, address: props.address };
  },
);
export const refreshAsync = createAsyncThunk('auth/refresh', async () => {
  const auth = getLocalStorage();
  if (auth) {
    const response = await refresh(auth.jwt);
    return response.data;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear: (state) => {
      localStorage.removeItem('auth');
      state.jwt = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // signin
      .addCase(signInAsync.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = AuthStatus.IDLE;
        state.jwt = action.payload.jwt;
        state.address = action.payload.address;
      })
      // refresh
      .addCase(refreshAsync.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(refreshAsync.fulfilled, (state, action) => {
        state.status = AuthStatus.IDLE;
        if (action.payload) {
          state.jwt = action.payload;
        }
      });
  },
});

export const { clear } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
