import {applyMiddleware, combineReducers, createStore} from "redux";
import {counterReducer} from "../Reducers/Counter-reducer";
import {ToDoListsReducer} from "../Reducers/ToDoLists-Reducer";
import {ToDoTaskReducer} from "../Reducers/ToDoTasks-Reducer";
import {usersReducer} from "../Reducers/Users-reducers";
import thunk from 'redux-thunk';
import {appReducer} from "../Reducers/App-reducer";
import {authReducer} from "../Reducers/Auth-reducer";
import {profileReducer} from "../Reducers/Profile-reducer";
import {configureStore, MiddlewareArray} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    counter: counterReducer,
    lists: ToDoListsReducer,
    tasks: ToDoTaskReducer,
    users: usersReducer,
    app: appReducer,
    auth: authReducer,
    profile: profileReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

/*export const store = createStore(rootReducer, applyMiddleware(thunk))*/
export const store = configureStore({
    reducer: rootReducer,
    middleware: new MiddlewareArray().concat(thunk),
})




// @ts-ignore
window.store = store

store.subscribe(() => {
    localStorage.setItem('value', JSON.stringify(store.getState().counter.value))
    localStorage.setItem('startValue', JSON.stringify(store.getState().counter.startValue))
    localStorage.setItem('maxValue', JSON.stringify(store.getState().counter.maxValue))
})