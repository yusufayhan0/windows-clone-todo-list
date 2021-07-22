import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNoteAction, deleteNoteAction, getAllColorsAction, updateNoteAction } from '../redux/actions'


function Not(props) {

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(getAllColorsAction())
        if (props.tempState.find(note => note.id === props.indexNo)) {
            setTextChangeSaveButton("text-change-note")
        }
    }, [])

    const colors = useSelector(state => state.noteReducer.colors)
    const [textChangeSaveButton, setTextChangeSaveButton] = useState("")
    const [textNote, setTextNote] = useState(props.yazi)
    const [darkColorArray, setdarkColorArray] = useState([1, 3, 4, 7, 8, 9])
    const [endAnimationState, setendAnimationState] = useState("")

    const handleEndNotesAnimastion = () => {
        setTimeout(() => {
            setendAnimationState("end-animation1")
            setTimeout(() => {
                setendAnimationState("end-animation2")
                setTimeout(() => {
                    setendAnimationState("")
                }, 30);
            }, 30);
        }, 30);
    }

    const handleSave = () => {
        dispatch(updateNoteAction({ id: props.indexNo, note: textNote, colorId: props.colorId }))
        setTextChangeSaveButton("")
        props.setTempState(value => value.filter(note => note.id !== props.indexNo))
        props.setsaveAlert(value => [...value.filter(index => index !== props.indexNo)])
    }

    const handleTextareaChange = (e) => {
        setTextNote(e.target.value)
        props.setTempState(value => value.length === 0
            ? [{ note: e.target.value, id: props.indexNo, colorId: props.colorId }]
            : value.find(note => note.id === props.indexNo)
                ? value.map(note => note.id === props.indexNo
                    ? { ...note, note: e.target.value }
                    : note
                )
                : [...value, { note: e.target.value, id: props.indexNo, colorId: props.colorId }])
        setTextChangeSaveButton("text-change-note")
        !props.saveAlert.find(index => index === props.indexNo) &&
            props.setsaveAlert(value => [...value, props.indexNo])
    }

    const handleEndNote = () => {
        props.notesLength !== 1
            ? dispatch(deleteNoteAction(props.indexNo))
            : handleEndNotesAnimastion()
    }

    return (
        <div style={{ backgroundColor: props.color }} className={"note-container " + endAnimationState} onClick={() => {
            props.setShowBarClass({ class: "click-note-bar", indexNo: props.indexNo })

        }}>
            <div className={"note-bar-settings " + (props.showSettingsClass.indexNo === props.indexNo ? props.showSettingsClass.class : "")}>
                <div className="colors-container">
                    {
                        colors.map((color, index) =>
                            <div key={index} style={{ background: color.color }}
                                onClick={() => dispatch(updateNoteAction({ id: props.indexNo, note: props.yazi, colorId: (index + 1) }))}
                            ></div>
                        )
                    }

                </div>
                <div onClick={handleEndNote} className="delete-note">
                    <p>Notu Sil</p>
                </div>
            </div>
            <div
                style={{ backgroundColor: props.color, color: darkColorArray.indexOf(props.colorId) === -1 ? "#000" : "#fff" }}
                className={"note-bar " + (props.showBarClass.indexNo === props.indexNo ? props.showBarClass.class : "")}>

                <div onClick={() =>
                    dispatch(createNoteAction({ note: "", colorId: 10 }))
                }>+</div>
                <div></div>

                <div>
                    <div onClick={() => {
                        props.setShowSettingsClass({ class: "click-note-bar-settings", indexNo: props.indexNo })
                    }}>...</div>
                    <div
                        onClick={handleEndNote}
                    >X</div>
                </div>
            </div>
            <textarea
                style={{
                    backgroundColor: props.color,
                    color: darkColorArray.indexOf(props.colorId) === -1
                        ? "#000"
                        : "#fff"
                }}
                onClick={() =>
                    props.setShowSettingsClass({ class: "", indexNo: props.indexNo })
                }
                onChange={(e) => {
                    handleTextareaChange(e)
                }}
                rows="5"
                defaultValue={props.yazi}
            ></textarea>
            <div onClick={() => {
                handleSave()
            }}
                className={"save-button-container " + textChangeSaveButton}
            >
                Kaydet
            </div>
        </div>
    )
}

export default Not
