import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { Dispatch } from "redux";
import { setError, setStatus } from "./App-reducer";
import { API } from "../DAL/API";
import { setToDo, addToDo } from "../Reducers/ToDoLists-Reducer";

export type taskType = {
  id: string;
  title: string;
  isDone: boolean;
  entityStatusTask: boolean;
};
export type tasksType = {
  [key: string]: Array<taskType>;
};

const initialState: tasksType = {};

export const toDoTasksSlice = createSlice({
  name: "todoTasks",
  initialState: initialState,
  reducers: {
    setTasksAC: (state, action: PayloadAction<any>) => {
      state[action.payload.todoID] = action.payload.tasks;
    },
    addTaskAC: (state, action: PayloadAction<any>) => {
      state[action.payload.todoID] = [
        {
          id: v1(),
          title: action.payload.taskName,
          isDone: false,
          entityStatusTask: false,
        },
        ...state[action.payload.todoID],
      ];
    },
    deleteTaskAC: (state, action: PayloadAction<any>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((el) => el.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    changeCheckBoxAC: (state, action: PayloadAction<any>) => {
      return {
        [action.payload.todoID]: state[action.payload.todoID].map((el) => {
          if (el.id === action.payload.taskID) {
            return { ...el, isDone: action.payload.isDone };
          } else return el;
        }),
      };
    },
    changeTaskNameAC: (state, action: PayloadAction<any>) => {
      return {
        [action.payload.todoID]: state[action.payload.todoID].map((el) => {
          if (el.id === action.payload.taskID) {
            return { ...el, title: action.payload.taskName };
          } else return el;
        }),
      };
    },
    changeTaskStatusAC: (state, action: PayloadAction<any>) => {
      return {
        [action.payload.todoID]: state[action.payload.todoID].map((el) => {
          if (el.id === action.payload.taskID) {
            return { ...el, entityStatusTask: action.payload.status };
          } else return el;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setToDo, (state, action) => {
        action.payload.newArray.forEach((el: any) => {
          state[el.id] = [];
        });
      })
      .addCase(addToDo, (state, action) => {
        state[action.payload.todolist.id] = [];
      });
  },
});

export const ToDoTaskReducer = toDoTasksSlice.reducer;
export const {
  setTasksAC,
  addTaskAC,
  deleteTaskAC,
  changeCheckBoxAC,
  changeTaskNameAC,
  changeTaskStatusAC,
} = toDoTasksSlice.actions;

export const setTasksThunk = (todoID: string) => {
  return (dispatch: Dispatch) => {
    API.setTask(todoID).then((response) => {
      dispatch(setTasksAC({ todoID, tasks: response.data.items }));
    });
  };
};

export const addTaskThunk = (todoID: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));

    API.addTask(todoID, title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(addTaskAC({ todoID, taskName: title }));
          dispatch(setStatus("succeeded"));
        } else {
          if (response.data.messages.length) {
            dispatch(setError({ error: response.data.messages[0] }));
          } else {
            dispatch(setError({ error: "Some error occurred" }));
          }
          dispatch(setStatus("failed"));
        }
      })
      .catch((error) => {
        dispatch(setError({ error: error.message }));
        dispatch(setStatus("failed"));
      });
  };
};

export const deleteTaskThunk = (todoID: string, taskID: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    dispatch(changeTaskStatusAC({ todoID, taskID, status: true }));

    API.deleteTask(todoID, taskID).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(deleteTaskAC({ todoID, taskID }));
        dispatch(changeTaskStatusAC({ todoID, taskID, status: false }));
        dispatch(setStatus("succeeded"));
      }
    });
  };
};
