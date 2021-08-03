import {Dispatch} from "redux";
import axios from "axios";

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

type actionType = addUsersType | setTotalType | setCurrentPageType

type initialStateType = typeof initialState

const initialState = {
    users: [] as Array<userItemType>,
    total: 0 as number,
    pageSize: 20 as number,
    currentPage: 1 as number
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

export const setUsersThunk = (pageSize: number, currentPage: number) => {
    return (dispatch: Dispatch) => {
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
            })
    }
}