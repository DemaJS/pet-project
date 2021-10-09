import {Dispatch} from "redux";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setStatus} from "./App-reducer";



const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}

type initialStateType = typeof initialState

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state:initialStateType, action: PayloadAction<{id: number, email: string, login: string, isAuth: boolean}>) => {
            return {...action.payload}
        }
    },
})

export const authReducer = authSlice.reducer
const {setAuth} = authSlice.actions



export const setAuthThunk = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setStatus({status:'loading'}))
        const response = await axios.get(` https://social-network.samuraijs.com/api/1.0/auth/me`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            })
        const {id, email, login} = response.data.data
        dispatch(setAuth({id, email, login, isAuth:true}))
        dispatch(setStatus({status:'succeeded'}))
    }
}

export const loginThunk = (email:string, password:string) => {
    return (dispatch:Dispatch) => {
        axios.post('https://social-network.samuraijs.com/api/1.1/auth/login', {email,password},
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
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
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(response => {
            if(response.data.resultCode === 0) {
                // @ts-ignore
                dispatch(setAuth({id:null,email:null,login:null,isAuth:false}))
            }
        })
    }
}