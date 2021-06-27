import {combineReducers, createStore} from "redux";
import {counterReducer} from "../Reducers/Counter-reducer";

const rootReducer = combineReducers({
    counter: counterReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

store.subscribe(() => {
    localStorage.setItem('value', JSON.stringify(store.getState().counter.value))
    localStorage.setItem('startValue', JSON.stringify(store.getState().counter.startValue))
    localStorage.setItem('maxValue', JSON.stringify(store.getState().counter.maxValue))
})