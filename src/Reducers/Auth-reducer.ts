import {Dispatch} from "redux";
import axios from "axios";


type setAuthType = ReturnType<typeof setAuthAC>

type actionType = setAuthType

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}

type initialStateType = typeof initialState

export const authReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}


export const setAuthAC = (id: number, email: string, login: string, isAuth: boolean) => {
    return {type: 'SET_AUTH', data: {id, email, login, isAuth}} as const
}

export const setAuthThunk = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get(` https://social-network.samuraijs.com/api/1.0/auth/me`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            })
        const {id, email, login} = response.data.data
        dispatch(setAuthAC(id, email, login, true))
    }
}

export const loginThunk = (email:string, password:string) => {
    return (dispatch:Dispatch) => {
        axios.post('https://social-network.samuraijs.com/api/1.1/auth/login', {email,password},
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            }).then(response => {
                if(response.data.resultCode === 0) {
                    // @ts-ignore
                    dispatch(setAuthThunk())
                }
        })
    }
}

export const logoutThunk = () => {
    return (dispatch:Dispatch) => {
        axios.delete('https://social-network.samuraijs.com/api/1.1/auth/login',
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            }).then(response => {
            if(response.data.resultCode === 0) {
                // @ts-ignore
                dispatch(setAuthAC(null,null,null,false))
            }
        })
    }
}