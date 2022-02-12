import { filterType, todoListsType } from "../Components/ToDo/ToDo";
import { Dispatch } from "redux";
import { setError, setStatus } from "./App-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../DAL/API";

const initialState: Array<todoListsType> = [];

export const toDoListsSlice = createSlice({
  name: "todoLists",
  initialState: initialState,
  reducers: {
    setToDo: (
      state,
      action: PayloadAction<{ newArray: Array<todoListsType> }>
    ) => {
      return action.payload.newArray.map((el) => ({
        ...el,
        filter: "all",
        entityStatus: false,
      }));
    },
    addToDo: (state, action: PayloadAction<{ todolist: todoListsType }>) => {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: false,
      });
    },
    deleteToDo: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    filterTasks: (
      state,
      action: PayloadAction<{ todoID: string; filter: filterType }>
    ) => {
      const index = state.findIndex((el) => el.id === action.payload.todoID);
      state[index].filter = action.payload.filter;
    },
    changeToDoStatus: (
      state,
      action: PayloadAction<{ todoID: string; status: boolean }>
    ) => {
      const index = state.findIndex((el) => el.id === action.payload.todoID);
      if (index > -1) {
        state[index].entityStatus = action.payload.status;
      }
    },
  },
});

export const ToDoListsReducer = toDoListsSlice.reducer;
export const { setToDo, addToDo, deleteToDo, filterTasks, changeToDoStatus } =
  toDoListsSlice.actions;

export const setToDoThunk = () => {
  return (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    API.setToDo().then((res) => {
      dispatch(setToDo({ newArray: res.data }));
      dispatch(setStatus("succeeded"));
    });
  };
};
export const addToDoThunk = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    API.addToDo(title).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(addToDo({ todolist: response.data.data.item }));
        dispatch(setStatus("succeeded"));
      } else {
        if (response.data.messages.length) {
          dispatch(setError({ error: response.data.messages[0] }));
        } else {
          dispatch(setError({ error: "Some error occurred" }));
        }
        dispatch(setStatus("failed"));
      }
    });
  };
};

export const deleteToDoThunk = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    dispatch(changeToDoStatus({ todoID: id, status: true }));
    API.deleteToDo(id).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(deleteToDo({ id }));
        dispatch(setStatus("succeeded"));
        dispatch(changeToDoStatus({ todoID: id, status: false }));
      }
    });
  };
};
