import {filterType, todoListsType} from "../Components/ToDo/ToDo";
import {v1} from "uuid";

type addToDoType = {
    type: 'ADD_TODO'
    title: string
    id:string
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
type actionType = addToDoType | deleteToDoType | filterTaskType


const initialState: Array<todoListsType> = []

export const ToDoListsReducer = (state: Array<todoListsType> = initialState, action: actionType) => {
    switch (action.type) {
        case "ADD_TODO":
            let newToDo = {id: action.id, title: action.title, filter: 'all'}
            return [newToDo, ...state];
        case "DELETE_TODO":
            return  state.filter(el => el.id !== action.id);
        case "FILTER_TASK":
            let filterTodoLists = state.find(el => el.id === action.todoID)
            if (filterTodoLists) {
                filterTodoLists.filter = action.filter
            }
            return [...state];

        default: return state
    }
}

export const addToDoAC = (title:string):addToDoType => {
    return {type:'ADD_TODO',title, id:v1()}
}
export const deleteToDoAC = (id:string):deleteToDoType => {
    return {type:'DELETE_TODO',id}
}
export const filterTaskAC = (todoID: string, filter: filterType):filterTaskType => {
    return {type:'FILTER_TASK', todoID, filter}
}