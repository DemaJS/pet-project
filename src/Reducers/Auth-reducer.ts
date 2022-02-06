import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStatus, setError } from "./App-reducer";
import { API } from "../DAL/API";

const initialState = {
  isAuth: {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
  },
};

type initialStateType = typeof initialState;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state: initialStateType, action: PayloadAction<any>) => {
      state.isAuth = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
const { setAuth } = authSlice.actions;

export const setAuthThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    const response = await API.setAuth();
    const { id, email, login } = response.data.data;
    dispatch(setAuth({ id, email, login, isAuth: true }));
    dispatch(setStatus("succeeded"));
  };
};

export const loginThunk = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await API.login(email, password);
      if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(setAuthThunk());
      }
    } catch (error: any) {
      dispatch(setError(error));
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await API.logout();
      if (response.data.resultCode === 0) {
        dispatch(
          setAuth({ id: null, email: null, login: null, isAuth: false })
        );
      }
    } catch (error: any) {
      dispatch(setError(error));
    }
  };
};
