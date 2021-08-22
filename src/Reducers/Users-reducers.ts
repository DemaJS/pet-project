import {Dispatch} from "redux";
import axios from "axios";
import {setErrorAC, setStatusAC} from "./App-reducer";

type photosType = {
    small: string
    large: string
}

export type userItemType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

export type setCurrentPageType = ReturnType<typeof setCurrentPageAC>
export type setTotalType = ReturnType<typeof setTotalAC>
export type addUsersType = ReturnType<typeof setUsersAC>
export type followUserType = ReturnType<typeof followUserAC>
export type unfollowUserType = ReturnType<typeof unfollowUserAC>

type actionType = addUsersType | setTotalType | setCurrentPageType | followUserType | unfollowUserType

type initialStateType = typeof initialState

const initialState = {
    users: [] as Array<userItemType>,
    total: 0,
    pageSize: 10,
    currentPage: 1
}


export const usersReducer = (state: initialStateType = initialState, action: actionType) => {

    switch (action.type) {
        case "ADD_USERS":
            return {
                ...state,
                users: [...action.users]
            };
        case "SET_TOTAL":
            return {
                ...state,
                total: action.total
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.page
            }
        case "FOLLOW_USER":
            return {
                ...state,
                users:state.users.map(el => {
                    if (el.id === action.userId) {
                       return {...el, followed:true}
                    }
                    return el
                })
            }
        case "UNFOLLOW_USER":
            return {
                ...state,
                users:state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed:false}
                    }
                    return el
                })
            }
        default:
            return state
    }
}

export const setUsersAC = (users: Array<userItemType>) => {
    return {type: 'ADD_USERS', users} as const
}
export const setTotalAC = (total: number) => {
    return {type: 'SET_TOTAL', total} as const
}
export const setCurrentPageAC = (page: number) => {
    return {type: 'SET_CURRENT_PAGE', page} as const
}
export const followUserAC = (userId: number) => {
    return {type: 'FOLLOW_USER', userId} as const
}
export const unfollowUserAC = (userId: number) => {
    return {type: 'UNFOLLOW_USER', userId} as const
}

export const setUsersThunk = (pageSize: number, currentPage: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        axios.get(` https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${currentPage}`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            })
            .then(response => {
                dispatch(setUsersAC(response.data.items))
                dispatch(setTotalAC(response.data.totalCount))
                dispatch(setCurrentPageAC(currentPage))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const followUserThunk = (userId: number) => {
    return (dispatch: Dispatch) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            }
        ).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(followUserAC(userId))
            }
        })
    }
}

export const unfollowUserThunk = (userId: number) => {
    return (dispatch: Dispatch) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
            {
                withCredentials: true,
                headers: {
                    'api-key': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
                }
            }
        ).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowUserAC(userId))
            }
        })
    }
}