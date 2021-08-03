import {filterType, todoListsType} from "../Components/ToDo/ToDo";
import {v1} from "uuid";
import axios from "axios";
import {Dispatch} from "redux";

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
type actionType = addToDoType | deleteToDoType | filterTaskType | setToDoType


const initialState: Array<todoListsType> = []

export const ToDoListsReducer = (state: Array<todoListsType> = initialState, action: actionType) => {
    switch (action.type) {
        case "SET_TODO":
            return action.newArray.map(el => {
                return {
                    ...el,
                    filter:'all'
                }
            })
        case "ADD_TODO":
            let newToDo = {id: action.id, title: action.title, filter: 'all'}
            return [newToDo, ...state];
        case "DELETE_TODO":
            return state.filter(el => el.id !== action.id);
        case "FILTER_TASK":
            let filterTodoLists = state.find(el => el.id === action.todoID)
            if (filterTodoLists) {
                filterTodoLists.filter = action.filter
            }
            return [...state];

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

export const getToDoThunk = () => {
    return (dispatch:Dispatch) => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {withCredentials:true,
            headers:{
                'api-key':'c2e39203-417e-4936-90ba-36cd8b9b6c99'
            }})
            .then(res => {
                dispatch(setToDoAC(res.data))
            })
    }
}
export const addToDoThunk = (title:string) => {
    return (dispatch:Dispatch) => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title},
            {withCredentials:true,
                headers:{
                    'api-key':'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }}).then(res => {
                    if(res.data.resultCode === 0) {
                        dispatch(addToDoAC(title))
                    }

        })
    }
}

export const deleteToDoThunk = (id:string) => {
    return (dispatch:Dispatch) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1//todo-lists/${id}`,
            {withCredentials:true,
                headers:{
                    'api-key':'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }}).then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteToDoAC(id))
            }

        })
    }
}