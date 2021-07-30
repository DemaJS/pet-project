import {tasksType, taskType} from "../Components/ToDo/ToDo";
import {v1} from "uuid";
import {addToDoType, setToDoType} from "./ToDoLists-Reducer";
import axios from "axios";
import {Dispatch} from "redux";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type addTaskType = ReturnType<typeof addTaskAC>
type deleteTaskType = ReturnType<typeof deleteTaskAC>
type changeCheckBoxType = ReturnType<typeof changeCheckBoxAC>
type changeTaskNameType = ReturnType<typeof changeTaskNameAC>
type setTasksType = ReturnType<typeof setTasksAC>


type actionType = addTaskType
    | deleteTaskType
    | changeCheckBoxType
    | changeTaskNameType
    | addToDoType
    | setToDoType
    | setTasksType

const initialState: tasksType = {}

export const ToDoTaskReducer = (state: tasksType = initialState, action: actionType) => {
    switch (action.type) {

        case "SET_TASKS":
            const stateCopy2 = {...state}
            stateCopy2[action.todoID] = action.tasks
            return stateCopy2

        case "SET_TODO":
            const stateCopy = {...state}
            action.newArray.forEach(el => {
                stateCopy[el.id] = []
            })
            return stateCopy

        case "ADD_TASK":
            state[action.todoID] = [{id: v1(), title: action.taskName, isDone: false}, ...state[action.todoID]]
            return {...state};
        case "DELETE_TASK":
            const newTasks = state[action.todoID]
            state[action.todoID] = newTasks.filter(el => el.id !== action.taskID)
            return {...state};

        case "CHANGE_CHECK_BOX":
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(el => {
                    if (el.id === action.taskID) {
                        return {...el, isDone: action.isDone}
                    } else return el
                })
            };

        case "CHANGE_TASK_NAME":
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(el => {
                    if (el.id === action.taskID) {
                        return {...el, title: action.taskName}
                    } else return el
                })
            }

        case "ADD_TODO":
            return {...state, [action.id]: []};

        default:
            return state
    }
}

export const setTasksAC = (todoID: string, tasks: Array<taskType>) => {
    return {type: 'SET_TASKS', todoID, tasks} as const
}

export const addTaskAC = (todoID: string, taskName: string) => {
    return {type: 'ADD_TASK', todoID, taskName} as const
}

export const deleteTaskAC = (todoID: string, taskID: string) => {
    return {type: 'DELETE_TASK', todoID, taskID} as const
}

export const changeCheckBoxAC = (todoID: string, taskID: string, isDone: boolean) => {
    return {type: 'CHANGE_CHECK_BOX', todoID, taskID, isDone} as const
}

export const changeTaskNameAC = (todoID: string, taskID: string, taskName: string) => {
    return {type: 'CHANGE_TASK_NAME', todoID, taskID, taskName} as const
}

export const setTasksThunk = (todoID:string) => {
    return (dispatch:Dispatch) => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}/tasks`,
            {withCredentials:true,
                headers:{
                    'api-key':'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }}).then(response => {
                    dispatch(setTasksAC(todoID, response.data.items))
        })
    }
}

export const addTaskThunk = (todoID:string, title:string) => {
    return (dispatch:Dispatch) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todoID}/tasks`,
            {title},
            {withCredentials:true,
                headers:{
                    'api-key':'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }}).then(response => {
                    if (response.data.resultCode === 0){
                        dispatch(addTaskAC(todoID, title))
                    }
        })
    }
}
