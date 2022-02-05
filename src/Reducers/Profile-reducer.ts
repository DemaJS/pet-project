import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setError, setStatus } from "./App-reducer";
import { API } from "../DAL/API";

type contactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

type photosType = {
  small: string;
  large: string;
};

export type profileType = {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: contactsType;
  photos: photosType;
};

type StateType = {
  profile: profileType | {};
};

const initialState: StateType = {
  profile: {},
};

export const appSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (
      state: StateType,
      action: PayloadAction<{ profile: profileType }>
    ) => {
      state.profile = action.payload;
    },
  },
});

export const profileReducer = appSlice.reducer;
export const { setProfile } = appSlice.actions;

export const setProfileThunk = (userID: number) => {
  return async (dispatch: any) => {
    try {
      const response = await API.setProfile(userID);
      dispatch(setProfile(response.data));
    } catch (error: any) {
      dispatch(setError(error));
    }
  };
};

export const updateProfileThunk = (profile: any) => {
  return async (dispatch: any, getState: any) => {
    let userId = getState().auth.userId;
    try {
      const response = await API.updateProfile(profile);
      if (response.data.resultCode === 0) {
        dispatch(setProfileThunk(userId));
      }
    } catch (error: any) {
      dispatch(setError(error));
      dispatch(setStatus({ status: "failed" }));
    }
  };
};

/* type setProfileType = ReturnType<typeof setProfileAC>;

type actionType = setProfileType;
 */

/* export const profileReducer = (
  state: initialStateType = initialState,
  action: actionType
) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: { ...action.profile },
      };
    default:
      return state;
  }
};

export const setProfileAC = (profile: profileType) => {
  return { type: "SET_PROFILE", profile } as const;
}; */
