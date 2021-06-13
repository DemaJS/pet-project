import React, {ChangeEvent, useState} from 'react'

type propsType = {
    value:string
    changeTaskName:(taskName:string) => void
}

export const EditableSpan = (props:propsType) => {
    const [editMode, setEditMode] = useState(true)
    const [title, setTitle] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onBlueHandler = () => {
        props.changeTaskName(title)
        setEditMode(true)
    }

    return (
        <>
            {
                editMode
                    ? <span onClick={() => setEditMode(false)}>{props.value}</span>
                    : <input value = {title} onChange={onChangeHandler} onBlur={onBlueHandler} />
            }

        </>
    )
}