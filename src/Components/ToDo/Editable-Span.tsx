import React, {ChangeEvent, useState} from 'react'

type propsType = {
    value:string
    changeTaskName:(taskName:string) => void
}

export const EditableSpan = (props:propsType) => {
    console.log('SPAN')
    const [editMode, setEditMode] = useState(true)
    const [title, setTitle] = useState(props.value)

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
                    ? <span onDoubleClick={() => setEditMode(false)}>{props.value}</span>
                    : <input value = {title} autoFocus onChange={onChangeHandler} onBlur={onBlueHandler} />
            }

        </>
    )
}