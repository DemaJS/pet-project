import {filterType, todoListsType} from "../Components/ToDo/ToDo";
import {v1} from "uuid";
import axios from "axios";
import {Dispatch} from "redux";
import {setError, setErrorAC, setStatus, setStatusAC} from "./App-reducer";

export type addToDoType = {
    type: 'ADD_TODO'
    title: string
    id: string
}
type deleteToDoType = {
    type: 'DELETE_TODO'
    id: string
}
type filterTaskType = {
    type: 'FILTER_TASK'
    todoID: string
    filter: filterType
}
export type setToDoType = {
    type: 'SET_TODO'
    newArray: Array<todoListsType>
}
type changeToDoStatusType = ReturnType<typeof changeToDoStatusAC>

type actionType = addToDoType | deleteToDoType | filterTaskType | setToDoType | changeToDoStatusType


const initialState: Array<todoListsType> = []

export const ToDoListsReducer = (state: Array<todoListsType> = initialState, action: actionType) => {
    switch (action.type) {
        case "SET_TODO":
            return action.newArray.map(el => {
                return {
                    ...el,
                    filter: 'all',
                    entityStatus: false
                }
            })
        case "ADD_TODO":
            let newToDo = {id: action.id, title: action.title, filter: 'all', entityStatus: false}
            return [newToDo, ...state];
        case "DELETE_TODO":
            return state.filter(el => el.id !== action.id);
        case "FILTER_TASK":
            let filterTodoLists = state.find(el => el.id === action.todoID)
            if (filterTodoLists) {
                filterTodoLists.filter = action.filter
            }
            return [...state];
        case "CHANGE_TODO_STATUS":
            return state.map(el => {
                if (el.id === action.todoID) {
                    return {...el, entityStatus: action.status}
                } else return el
            })
        default:
            return state
    }
}

export const setToDoAC = (newArray: Array<todoListsType>): setToDoType => {
    return {type: 'SET_TODO', newArray}
}
export const addToDoAC = (title: string): addToDoType => {
    return {type: 'ADD_TODO', title, id: v1()}
}
export const deleteToDoAC = (id: string): deleteToDoType => {
    return {type: 'DELETE_TODO', id}
}
export const filterTaskAC = (todoID: string, filter: filterType): filterTaskType => {
    return {type: 'FILTER_TASK', todoID, filter}
}
export const changeToDoStatusAC = (todoID: string, status: boolean) => {
    return {type: 'CHANGE_TODO_STATUS', todoID, status} as const
}

export const setToDoThunk = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus({status:'loading'}))
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            })
            .then(res => {
                dispatch(setToDoAC(res.data))
                dispatch(setStatus({status:'succeeded'}))
            })
    }
}
export const addToDoThunk = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus({status:'loading'}))
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title},
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addToDoAC(title))
                dispatch(setStatus({status:'succeeded'}))
            } else {
                if (response.data.messages.length) {
                    dispatch(setError({error:response.data.messages[0]}))
                } else {
                    dispatch(setError({error:'Some error occurred'}))
                }
                dispatch(setStatus({status:'failed'}))
            }

        })
    }
}

export const deleteToDoThunk = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus({status:'loading'}))
        dispatch(changeToDoStatusAC(id, true))
        axios.delete(`https://social-network.samuraijs.com/api/1.1//todo-lists/${id}`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteToDoAC(id))
                dispatch(setStatus({status:'succeeded'}))
                dispatch(changeToDoStatusAC(id, false))
            }

        })
    }
}