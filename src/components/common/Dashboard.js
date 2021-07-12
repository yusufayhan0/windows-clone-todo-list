import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Note from '../note/Not'
import { getAllColorsAction, getAllNotesAction } from '../redux/actions'


let data = [
    { id: 1, note: "note1" },
]

//setDataState(value => [...value.splice(siraNo, 0, { id: idNo.id, note: "note" + idNo.id })])

function Dashboard() {

    const [showSettingsClass, setShowSettingsClass] = useState("")
    const [showBarClass, setShowBarClass] = useState("")
    const [saveAlert, setsaveAlert] = useState([])
    const [searchState, setSearchState] = useState([])
    const [tempState, setTempState] = useState([])
    const [stateSearchText, setStateSearchText] = useState("")


    const state = useSelector(state => state.noteReducer.notes)
    useLayoutEffect(() => {
        setSearchState([
            ...state.map(a => tempState.find(note => note.id === a.id)
                ? { ...a, note: tempState.find(note => note.id === a.id).note }
                : a)
                .filter(a => a.note.search(stateSearchText) !== -1
                    ? true
                    : false)
        ])
    }, [state])


    useEffect(() => {
        if (saveAlert.length > 0) {
            window.onbeforeunload = function (event) {
                return "";
            };
        }
        else {
            window.onbeforeunload = null;
        }
    }, [saveAlert])

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(getAllNotesAction())
        dispatch(getAllColorsAction())
    }, [])

    useEffect(() => {
        setSearchState([
            ...state.map(a => tempState.find(note => note.id === a.id) ? { ...a, note: tempState.find(note => note.id === a.id).note } : a).filter(a => a.note.search(stateSearchText) !== -1 ? true : false)
        ])
    }, [stateSearchText])


    const allColors = useSelector(state => state.colorReducer.colors)

    return (
        <div className="dasboard-container">
            <input placeholder="Search" onChange={(e) => {
                setStateSearchText(e.target.value)
            }} className="search-note-input" type="text" name="" id="" />
            <div className="dashboard-note-container">
                {
                    searchState.map(note =>
                        <Note
                            key={note.id}
                            yazi={note.note}
                            indexNo={note.id}

                            setShowBarClass={setShowBarClass}
                            setShowSettingsClass={setShowSettingsClass}

                            notesLength={state.length}
                            showSettingsClass={showSettingsClass}
                            showBarClass={showBarClass}
                            colorId={note.colorId}
                            color={allColors[note.colorId - 1]?.color}
                            setsaveAlert={setsaveAlert}
                            setTempState={setTempState}
                            tempState={tempState}
                            saveAlert={saveAlert}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard
