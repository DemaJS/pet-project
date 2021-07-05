import {combineReducers, createStore} from "redux";
import {counterReducer} from "../Reducers/Counter-reducer";
import {ToDoListsReducer} from "../Reducers/ToDoLists-Reducer";
import {ToDoTaskReducer} from "../Reducers/ToDoTasks-Reducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    lists:ToDoListsReducer,
    tasks:ToDoTaskReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

store.subscribe(() => {
    localStorage.setItem('value', JSON.stringify(store.getState().counter.value))
    localStorage.setItem('startValue', JSON.stringify(store.getState().counter.startValue))
    localStorage.setItem('maxValue', JSON.stringify(store.getState().counter.maxValue))
})