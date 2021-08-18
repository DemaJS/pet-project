import {Dispatch} from "redux";
import axios from "axios";

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
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            }).then(response => {
            dispatch(setProfileAC(response.data))
        })
    }
}

export const updateProfileThunk = (profile: any) => {
    return (dispatch:any, getState:any) => {
        let userId = getState().auth.userId
        axios.put(` https://social-network.samuraijs.com/api/1.0/profile`,{profile},
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            }).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setProfileThunk(userId))
            }
        })
    }
}