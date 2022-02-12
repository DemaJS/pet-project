import { Dispatch } from "redux";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStatus, setError } from "./App-reducer";
import { API } from "../DAL/API";

type photosType = {
  small: string;
  large: string;
};

export type userItemType = {
  id: number;
  name: string;
  status: string;
  photos: photosType;
  followed: boolean;
};

type initialStateType = typeof initialState;

const initialState = {
  users: [] as Array<userItemType>,
  total: 0,
  pageSize: 10,
  currentPage: 1,
};

export const setUsersThunk = createAsyncThunk(
  "users/setUsers",
  async (data: { pageSize: number; currentPage: number }, thunkAPI) => {
    thunkAPI.dispatch(setStatus("loading"));
    try {
      const response = await API.setUsers(data.pageSize, data.currentPage);
      thunkAPI.dispatch(setCurrentPage(data.currentPage));
      thunkAPI.dispatch(setStatus("succeeded"));
      return response;
    } catch (error: any) {
      thunkAPI.dispatch(setError(error));
    }
  }
);

export const followUserThunk = (userId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await API.followUser(userId);
      if (response.data.resultCode === 0) dispatch(followUser(userId));
    } catch (error: any) {
      dispatch(setError(error));
    }
  };
};

export const unfollowUserThunk = (userId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await API.unfollowUser(userId);
      if (response.data.resultCode === 0) dispatch(unFollowUser(userId));
    } catch (error: any) {
      dispatch(setError(error));
    }
  };
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (
      state: initialStateType,
      action: PayloadAction<number>
    ) => {
      state.currentPage = action.payload;
    },
    followUser: (state: initialStateType, action: PayloadAction<number>) => {
      state.users = state.users.map((el: any) => {
        if (el.id === action.payload) {
          return { ...el, followed: true };
        }
        return el;
      });
    },
    unFollowUser: (state: initialStateType, action: PayloadAction<number>) => {
      state.users = state.users.map((el: any) => {
        if (el.id === action.payload) {
          return { ...el, followed: false };
        }
        return el;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload?.data.items;
      state.total = action.payload?.data.totalCount;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { setCurrentPage, followUser, unFollowUser } = usersSlice.actions;
