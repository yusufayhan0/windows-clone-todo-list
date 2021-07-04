import React, { useEffect, useState } from 'react'
import Note from '../note/Not'


let data = [
    { id: 1, note: "note1" },
]

//setDataState(value => [...value.splice(siraNo, 0, { id: idNo.id, note: "note" + idNo.id })])

function Dashboard() {

    const [dataState, setDataState] = useState(data)
    const [idNo, setidNo] = useState({ id: 1 })
    const [showSettingsClass, setShowSettingsClass] = useState("")
    const [showBarClass, setShowBarClass] = useState("")
    const [color, setColor] = useState({ color: "burlywood" })

    const handleNewNote = (indexNo) => {
        setidNo(value => ({ ...value, id: value.id + 1, indexNo }))
    }

    useEffect(() => {
        if (idNo.id > 1) {
            setDataState(value => [{ id: idNo.id, note: "note" + idNo.id }, ...value])
        }
    }, [idNo])

    useEffect(() => {
        console.log(dataState)
    }, [dataState])



    return (
        <div className="dasboard-container">
            {
                dataState.map(note =>
                    <Note
                        handleNewNote={handleNewNote}
                        key={note.id} yazi={note.note}
                        indexNo={note.id}

                        setShowBarClass={setShowBarClass}
                        setShowSettingsClass={setShowSettingsClass}
                        setColor={setColor}

                        showSettingsClass={showSettingsClass}
                        showBarClass={showBarClass}
                        color={color}

                    />
                )
            }
        </div>
    )
}

export default Dashboard
