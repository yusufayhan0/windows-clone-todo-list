import * as actionType from "./actionType"

const noteInitialState = {
    notes: [],
    colors: [],
    postErrorMessage: "",
    getErrorMessage: "",
    putErrorMessage: "",
    deleteErrorMessage: "",
    colorErrorMessage: ""
}



export const noteReducer = (state = noteInitialState, action) => {
    switch (action.type) {

        case actionType.GET_NOTE_SUCCESS:
            return { ...state, notes: action.payload }
        case actionType.GET_NOTE_ERROR:
            return { ...state, getErrorMessage: action.payload }

        case actionType.UPDATE_NOTE_SUCCESS:
            return { ...state, notes: state.notes.map(note => note.id === action.payload.id ? action.payload : note) }
        case actionType.UPDATE_NOTE_ERROR:
            return { ...state, putErrorMessage: action.payload }

        case actionType.POST_NOTE_SUCCESS:
            return { ...state, notes: [action.payload, ...state.notes] }
        case actionType.POST_NOTE_ERROR:
            return { ...state, postErrorMessage: action.payload }

        case actionType.DELETE_NOTE_SUCCESS:
            return { ...state, notes: state.notes.filter(note => note.id !== action.payload) }
        case actionType.DELETE_NOTE_ERROR:
            return { ...state, deleteErrorMessage: action.payload }

        case actionType.GET_COLOR_SUCCESS:
            return { ...state, colors: action.payload }
        case actionType.GET_COLOR_ERROR:
            return { ...state, colorErrorMessage: action.payload }

        default:
            return state

    }
}

const colorInitialState = {
    colors: [],
    errorMessage: ""
}

export const colorReducer = (state = colorInitialState, action) => {
    switch (action.type) {

        case actionType.GET_COLOR_SUCCESS:
            return { ...state, colors: action.payload }
        case actionType.GET_COLOR_ERROR:
            return { ...state, errorMessage: action.payload }



        default:
            return state

    }
}