import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type statusType = "loading" | "succeeded" | "failed";

const initialState = {
  status: "loading" as statusType,
  error: null as string | null,
};

type initialStateType = typeof initialState;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatus: (
      state: initialStateType,
      action: PayloadAction<{ status: statusType }>
    ) => {
      state.status = action.payload.status;
    },
    setError: (
      state: initialStateType,
      action: PayloadAction<{ error: string | null }>
    ) => {
      state.error = action.payload.error;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setStatus, setError } = appSlice.actions;
