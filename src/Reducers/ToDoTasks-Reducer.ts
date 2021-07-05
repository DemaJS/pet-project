import {tasksType} from "../Components/ToDo/ToDo";
import {v1} from "uuid";

type addTaskType = {
    type:'ADD_TASK'
    todoID: string
    taskName: string
}
type deleteTaskType = {
    type:'DELETE_TASK'
    todoID: string
    taskID: string
}
type changeCheckBoxType = {
    type:'CHANGE_CHECK_BOX'
    todoID: string
    taskID: string
    isDone: boolean
}
type changeTaskNameType = {
    type:'CHANGE_TASK_NAME'
    todoID: string
    taskID: string
    taskName: string
}
type addToDoType = {
    type: 'ADD_TODO'
    title: string
    id:string
}
type actionType = addTaskType | deleteTaskType | changeCheckBoxType | changeTaskNameType | addToDoType

const initialState:tasksType = {}

export const ToDoTaskReducer = (state:tasksType = initialState, action:actionType) => {
    switch (action.type) {
        case "ADD_TASK":
            state[action.todoID] = [{id: v1(), title: action.taskName, isDone: false}, ...state[action.todoID]]
            return {...state};
        case "DELETE_TASK":
            const newTasks = state[action.todoID]
            state[action.todoID] = newTasks.filter(el => el.id !== action.taskID)
            return {...state};
        case "CHANGE_CHECK_BOX":
            let tasks = state[action.todoID].find(el => el.id === action.taskID)
            if (tasks) {
                tasks.isDone = action.isDone
            }
            return {...state};
        case "CHANGE_TASK_NAME":
            let task = state[action.todoID].find(el => el.id === action.taskID)
            if (task) {
                task.title = action.taskName
            }
            return {...state}
        case "ADD_TODO":
            return {...state, [action.id]:[]};

        default: return state
    }
}

export const addTaskAC = (todoID: string,taskName: string):addTaskType => {
    return {type:'ADD_TASK',todoID,taskName}
}
export const deleteTaskAC = ( todoID: string, taskID: string):deleteTaskType => {
    return  {type:'DELETE_TASK',todoID,taskID}
}
export const changeCheckBoxAC = (todoID: string,taskID: string, isDone: boolean):changeCheckBoxType => {
    return {type:'CHANGE_CHECK_BOX',todoID,taskID,isDone}
}
export const changeTaskNameAC = (todoID: string,taskID: string,taskName: string):changeTaskNameType => {
    return {type:'CHANGE_TASK_NAME',todoID,taskID,taskName}
}