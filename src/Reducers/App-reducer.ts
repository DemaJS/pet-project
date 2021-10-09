import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type statusType = 'loading' | 'succeeded' | 'failed'


const initialState = {
    status: 'loading' as statusType,
    error: null as string | null
}

type initialStateType = typeof initialState

type setStatusType = ReturnType<typeof setStatusAC>
type setErrorType = ReturnType<typeof setErrorAC>

type actionType = setStatusType | setErrorType

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatus: (state:initialStateType, action: PayloadAction<{status:statusType}>) => {
            state.status = action.payload.status
        },
        setError:(state, action:PayloadAction<{error:string | null}>) => {
            state.error = action.payload.error
        }
    },
})

export const appReducer = appSlice.reducer
export const {setStatus,setError} = appSlice.actions

/*export const appReducer = (state: initialStateType = initialState, action: actionType) => {
    switch (action.type) {
        case "SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}*/

export const setStatusAC = (status: statusType) => {
    return {type: 'SET_STATUS', status} as const
}
export const setErrorAC = (error: string | null) => {
    return {type: 'SET_ERROR', error} as const
}
