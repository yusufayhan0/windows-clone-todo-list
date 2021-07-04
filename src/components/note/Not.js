import React, { useEffect, useState } from 'react'

function Not(props) {

    const [colors, setColors] = useState([
        "blue", "coral", "brown", "darkgreen", "hotpink", "gold", "indigo", "red", "darkslategray", "burlywood"
    ])
    const [currentColor, setCurrentColor] = useState("burlywood")

    return (
        <div style={{ backgroundColor: props.color.indexNo === props.indexNo ? props.color.color : currentColor }} className="note-container" onClick={() => {
            props.setShowBarClass({ class: "click-note-bar", indexNo: props.indexNo })

        }}>
            <div className={"note-bar-settings " + (props.showSettingsClass.indexNo === props.indexNo ? props.showSettingsClass.class : "")}>
                <div className="colors-container">
                    {
                        colors.map((color, index) =>
                            <div onClick={() => {
                                props.setColor({ color: color, indexNo: props.indexNo })
                                setCurrentColor(color)
                            }
                            } key={index} style={{ background: color }}></div>
                        )
                    }

                </div>
                <div className="delete-note">
                    <p>Notu Sil</p>
                </div>
            </div>
            <div style={{ backgroundColor: props.color.indexNo === props.indexNo ? props.color.color : currentColor }} className={"note-bar " + (props.showBarClass.indexNo === props.indexNo ? props.showBarClass.class : "")}>
                <div onClick={() =>
                    props.handleNewNote(props.indexNo)
                }>+</div>
                <div>
                    <div onClick={() => {
                        props.setShowSettingsClass({ class: "click-note-bar-settings", indexNo: props.indexNo })
                    }}>...</div>
                    <div>X</div>
                </div>
            </div>
            <textarea style={{ backgroundColor: props.color.indexNo === props.indexNo ? props.color.color : currentColor }} name="" id="" onClick={() =>
                props.setShowSettingsClass({ class: "", indexNo: props.indexNo })

            } rows="5" defaultValue={props.yazi} ></textarea>
        </div>
    )
}

export default Not
