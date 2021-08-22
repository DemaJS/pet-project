const initialState = {
    value: 0 as number,
    startValue: 0 as number,
    maxValue: 0 as number
}
type initialStateType = typeof initialState

export const counterReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "INC_VALUE":
            return {
                ...state,
                value: state.value + 1
            };
        case "RESET_VALUE":
            return {
                ...state,
                value: state.value = 0
            }
        case "SET_VALUE":
            return {
                ...state,
                value: action.newValue
            }
        case "SET_START_VALUE":
            return {
                ...state,
                startValue: action.startValue
            }
        case "SET_MAX_VALUE":
            return {
                ...state,
                maxValue: action.maxValue
            }
        default:
            return state
    }
}

export const incValueAC = () => ({type: 'INC_VALUE'} as const)
export const resetValueAC = () => ({type: 'RESET_VALUE'} as const)
export const setStartValueAC = (startValue: number) => ({type: 'SET_START_VALUE', startValue} as const)
export const setMaxValueAC = (maxValue: number) => ({type: 'SET_MAX_VALUE', maxValue} as const)
export const setValueAC = (newValue: number) => ({type: 'SET_VALUE', newValue} as const)

export type incValueActionType = ReturnType<typeof incValueAC>
export type resetValueActionType = ReturnType<typeof resetValueAC>
export type setStartValueActionType = ReturnType<typeof setStartValueAC>
export type setMaxValueActionType = ReturnType<typeof setMaxValueAC>
export type setValueActionType = ReturnType<typeof setValueAC>

export type actionType = incValueActionType | resetValueActionType |
    setStartValueActionType | setMaxValueActionType | setValueActionType