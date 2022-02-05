import {tasksType, taskType} from "../Components/ToDo/ToDo";
import {v1} from "uuid";
import {addToDoType, setToDoType} from "./ToDoLists-Reducer";
import axios from "axios";
import {Dispatch} from "redux";
import {setError, setStatus} from "./App-reducer";


type addTaskType = ReturnType<typeof addTaskAC>
type deleteTaskType = ReturnType<typeof deleteTaskAC>
type changeCheckBoxType = ReturnType<typeof changeCheckBoxAC>
type changeTaskNameType = ReturnType<typeof changeTaskNameAC>
type setTasksType = ReturnType<typeof setTasksAC>
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

type actionType = addTaskType
    | deleteTaskType
    | changeCheckBoxType
    | changeTaskNameType
    | addToDoType
    | setToDoType
    | setTasksType
    | changeTaskStatusType

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
            state[action.todoID] = [{id: v1(), title: action.taskName, isDone: false, entityStatusTask:false}, ...state[action.todoID]]
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

        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(el => {
                    if (el.id === action.taskID) {
                        return {...el, entityStatusTask:action.status}
                    } else return el
                })
            }
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
export const changeTaskStatusAC = (todoID: string, taskID: string, status: boolean) => {
    return {type: 'CHANGE_TASK_STATUS', todoID, taskID, status} as const
}

export const setTasksThunk = (todoID: string) => {
    console.log('setTasksThunk')
    return (dispatch: Dispatch) => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}/tasks`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(response => {
            dispatch(setTasksAC(todoID, response.data.items))
        })

    }
}

export const addTaskThunk = (todoID: string, title: string) => {

    return (dispatch: Dispatch) => {
        dispatch(setStatus({status:'loading'}))
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}/tasks`, {title},
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(todoID, title))
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
            .catch(error => {
                dispatch(setError({error:error.message}))
                dispatch(setStatus({status:'failed'}))
            })
    }
}

export const deleteTaskThunk = (todoID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus({status:'loading'}))
        dispatch(changeTaskStatusAC(todoID,taskID,true))
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}/tasks/${taskID}`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(deleteTaskAC(todoID, taskID))
                dispatch(changeTaskStatusAC(todoID,taskID,false))
                dispatch(setStatus({status:'succeeded'}))
            }
        })
    }
}
