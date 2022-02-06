import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (
      state: initialStateType,
      action: PayloadAction<Array<userItemType>>
    ) => {
      state.users = action.payload;
    },
    setTotal: (state: initialStateType, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
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
});

export const usersReducer = usersSlice.reducer;
export const { setUsers, setTotal, setCurrentPage, followUser, unFollowUser } =
  usersSlice.actions;

export const setUsersThunk = (pageSize: number, currentPage: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const response = await API.setUsers(pageSize, currentPage);
      dispatch(setUsers(response.data.items));
      dispatch(setTotal(response.data.totalCount));
      dispatch(setCurrentPage(currentPage));
      dispatch(setStatus("succeeded"));
    } catch (error: any) {
      dispatch(setError(error));
    }
  };
};

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

/* export type setCurrentPageType = ReturnType<typeof setCurrentPageAC>;
export type setTotalType = ReturnType<typeof setTotalAC>;
export type addUsersType = ReturnType<typeof setUsersAC>;
export type followUserType = ReturnType<typeof followUserAC>;
export type unfollowUserType = ReturnType<typeof unfollowUserAC>; */

/* type actionType =
  | addUsersType
  | setTotalType
  | setCurrentPageType
  | followUserType
  | unfollowUserType; */

/* export const usersReducer = (
  state: initialStateType = initialState,
  action: actionType
) => {
  switch (action.type) {
    case "ADD_USERS":
      return {
        ...state,
        users: [...action.users],
      };
    case "SET_TOTAL":
      return {
        ...state,
        total: action.total,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.page,
      };
    case "FOLLOW_USER":
      return {
        ...state,
        users: state.users.map((el) => {
          if (el.id === action.userId) {
            return { ...el, followed: true };
          }
          return el;
        }),
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        users: state.users.map((el) => {
          if (el.id === action.userId) {
            return { ...el, followed: false };
          }
          return el;
        }),
      };
    default:
      return state;
  }
}; */

/* export const setUsersAC = (users: Array<userItemType>) => {
  return { type: "ADD_USERS", users } as const;
};
export const setTotalAC = (total: number) => {
  return { type: "SET_TOTAL", total } as const;
};
export const setCurrentPageAC = (page: number) => {
  return { type: "SET_CURRENT_PAGE", page } as const;
};
export const followUserAC = (userId: number) => {
  return { type: "FOLLOW_USER", userId } as const;
};
export const unfollowUserAC = (userId: number) => {
  return { type: "UNFOLLOW_USER", userId } as const;
}; */
