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

type initialStateType = typeof initialState

const initialState = {
    users: [] as Array<userItemType>
}


export const usersReducer = (state: initialStateType = initialState, action: actionType) => {

    switch (action.type) {
        case "ADD_USERS":
            return {
                ...state,
                users: [...action.users]
            };
        default: return state
    }
}

export const addUsersAC = (users:Array<userItemType>) => {
    return {type:'ADD_USERS',users} as const
}
export type addUsersType = ReturnType<typeof addUsersAC>

type actionType = addUsersType