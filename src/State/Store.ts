import {applyMiddleware, combineReducers, createStore} from "redux";
import {counterReducer} from "../Reducers/Counter-reducer";
import {ToDoListsReducer} from "../Reducers/ToDoLists-Reducer";
import {ToDoTaskReducer} from "../Reducers/ToDoTasks-Reducer";
import {usersReducer} from "../Reducers/Users-reducers";
import thunk from 'redux-thunk';
import {appReducer} from "../Reducers/App-reducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    lists:ToDoListsReducer,
    tasks:ToDoTaskReducer,
    users:usersReducer,
    app:appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,  applyMiddleware(thunk))

store.subscribe(() => {
    localStorage.setItem('value', JSON.stringify(store.getState().counter.value))
    localStorage.setItem('startValue', JSON.stringify(store.getState().counter.startValue))
    localStorage.setItem('maxValue', JSON.stringify(store.getState().counter.maxValue))
})