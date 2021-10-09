import axios from "axios";
import {setErrorAC, setStatusAC} from "./App-reducer";

type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type photosType = {
    small: string
    large: string
}

export type profileType = {
    userId: number
    aboutMe:string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType

}

type initialStateType = typeof initialState

type setProfileType = ReturnType<typeof setProfileAC>

type actionType = setProfileType

const initialState = {
    profile: {} as profileType
}

export const profileReducer = (state: initialStateType = initialState, action: actionType) => {
    switch (action.type) {
        case "SET_PROFILE":
            return {
                ...state,
                profile: {...action.profile}
            }
        default: return state
    }
}

export const setProfileAC = (profile: profileType) => {
    return {type: 'SET_PROFILE', profile} as const
}

export const setProfileThunk = (userID: number) => {
    return (dispatch: any) => {
        axios.get(` https://social-network.samuraijs.com/api/1.0/profile/${userID}`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(response => {
            dispatch(setProfileAC(response.data))
        })
    }
}

export const updateProfileThunk = (profile: any) => {
    return (dispatch:any, getState:any) => {
        let userId = getState().auth.userId
        axios.put(` https://social-network.samuraijs.com/api/1.0/profile`, {...profile},
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2b8cbaf-b19e-4763-b68e-015f5b7c7690'
                }
            }).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setProfileThunk(userId))
            } else {
                if (response.data.messages.length) {
                    dispatch(setErrorAC(response.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setStatusAC('failed'))
            }
        })
    }
}