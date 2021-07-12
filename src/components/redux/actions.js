

import axios from "axios"
import * as actionType from "./actionType"
import { baseNotesUrl } from "./baseUrl"



export const getAllNotesAction = () => dispatch => {
    axios.get(baseNotesUrl + "notes")
        .then(result => {
            dispatch({ type: actionType.GET_NOTE_SUCCESS, payload: result.data })
        })
        .catch(err => {
            dispatch({ type: actionType.GET_NOTE_ERROR, payload: err.response })
        })
}

export const createNoteAction = (note) => dispatch => {
    axios.post(baseNotesUrl + "notes", {
        ...note
    })
        .then(result => {
            dispatch({ type: actionType.POST_NOTE_SUCCESS, payload: result.data })
        })
        .catch(err => {
            dispatch({ type: actionType.POST_NOTE_ERROR, payload: err.response })
        })
}

export const deleteNoteAction = (noteId) => dispatch => {
    axios.delete(baseNotesUrl + "notes/" + noteId)
        .then(() => {
            dispatch({ type: actionType.DELETE_NOTE_SUCCESS, payload: noteId })
        })
        .catch(err => {
            dispatch({ type: actionType.DELETE_NOTE_ERROR, payload: err.response })
        })
}

export const updateNoteAction = (note) => async dispatch => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",note)
    await axios.put(baseNotesUrl + "notes/" + note.id, {
        ...note
    })
        .then(result => {
            dispatch({ type: actionType.UPDATE_NOTE_SUCCESS, payload: result.data })
        })
        .catch(err => {
            dispatch({ type: actionType.UPDATE_NOTE_ERROR, payload: err.response })
        })
}

export const getAllColorsAction = () => dispatch => {
    axios.get(baseNotesUrl + "colors")
        .then(result => {
            dispatch({ type: actionType.GET_COLOR_SUCCESS, payload: result.data })
        })
        .catch(err => {
            dispatch({ type: actionType.GET_COLOR_ERROR, payload: err.response })
        })
}