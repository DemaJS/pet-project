import { filterType, todoListsType } from "../Components/ToDo/ToDo";
import { v1 } from "uuid";
import { Dispatch } from "redux";
import { setError, setStatus } from "./App-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../DAL/API";

export type addToDoType = {
  type: "ADD_TODO";
  title: string;
  id: string;
};
type deleteToDoType = {
  type: "DELETE_TODO";
  id: string;
};
type filterTaskType = {
  type: "FILTER_TASK";
  todoID: string;
  filter: filterType;
};
export type setToDoType = {
  type: "SET_TODO";
  newArray: Array<todoListsType>;
};
type changeToDoStatusType = ReturnType<typeof changeToDoStatusAC>;

type actionType =
  | addToDoType
  | deleteToDoType
  | filterTaskType
  | setToDoType
  | changeToDoStatusType;

const initialState: Array<todoListsType> = [];

/*export const toDoListsSlice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        setToDo: (state, action: PayloadAction<{ newArray: Array<todoListsType> }>) => {
            return action.payload.newArray.map(el => ({...el, filter: 'all', entityStatus: false}))
        },
        addToDo: (state, action: PayloadAction<{ title: string }>) => {
            state.push({id: v1(), title: action.payload.title, filter: 'all', entityStatus: false})
        },
        deleteToDo: (state, action:PayloadAction<{id:string}>) => {
            const index = state.findIndex(el => el.id === action.payload.id)
            if(index > -1) {
                state.splice(index,1)
            }
        },
        filterTasks: (state,action:PayloadAction<{todoID:string,filter: filterType}>) => {
            const index = state.findIndex(el => el.id === action.payload.todoID)
            state[index].filter = action.payload.filter
        },
        changeToDoStatus: (state,action:PayloadAction<{todoID: string, status: boolean}>) => {
            const index = state.findIndex(el => el.id === action.payload.todoID)
            state[index].entityStatus = action.payload.status
        }
     },
})

export const ToDoListsReducer = toDoListsSlice.reducer
export const {setToDo,addToDo,deleteToDo,filterTasks,changeToDoStatus} = toDoListsSlice.actions*/

export const ToDoListsReducer = (
  state: Array<todoListsType> = initialState,
  action: actionType
) => {
  switch (action.type) {
    case "SET_TODO":
      return action.newArray.map((el) => {
        return {
          ...el,
          filter: "all",
          entityStatus: false,
        };
      });
    case "ADD_TODO":
      let newToDo = {
        id: action.id,
        title: action.title,
        filter: "all",
        entityStatus: false,
      };
      return [newToDo, ...state];
    case "DELETE_TODO":
      return state.filter((el) => el.id !== action.id);
    case "FILTER_TASK":
      let filterTodoLists = state.find((el) => el.id === action.todoID);
      if (filterTodoLists) {
        filterTodoLists.filter = action.filter;
      }
      return [...state];
    case "CHANGE_TODO_STATUS":
      return state.map((el) => {
        if (el.id === action.todoID) {
          return { ...el, entityStatus: action.status };
        } else return el;
      });
    default:
      return state;
  }
};

export const setToDoAC = (newArray: Array<todoListsType>): setToDoType => {
  return { type: "SET_TODO", newArray };
};
export const addToDoAC = (title: string): addToDoType => {
  return { type: "ADD_TODO", title, id: v1() };
};
export const deleteToDoAC = (id: string): deleteToDoType => {
  return { type: "DELETE_TODO", id };
};
export const filterTaskAC = (
  todoID: string,
  filter: filterType
): filterTaskType => {
  return { type: "FILTER_TASK", todoID, filter };
};
export const changeToDoStatusAC = (todoID: string, status: boolean) => {
  return { type: "CHANGE_TODO_STATUS", todoID, status } as const;
};

export const setToDoThunk = () => {
  return (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    API.setToDo().then((res) => {
      dispatch(setToDoAC(res.data));
      dispatch(setStatus("succeeded"));
    });
  };
};
export const addToDoThunk = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatus("loading"));
    API.addToDo(title).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(addToDoAC(title));
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
    dispatch(changeToDoStatusAC(id, true));
    API.deleteToDo(id).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(deleteToDoAC(id));
        dispatch(setStatus("succeeded"));
        dispatch(changeToDoStatusAC(id, false));
      }
    });
  };
};
