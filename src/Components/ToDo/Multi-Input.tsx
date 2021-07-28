import React, {ChangeEvent, useCallback, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


type propsType = {
    addToDo: (title: string) => void
}



export const MultiInput = React.memo((props:propsType) => {

    console.log('INPUT')

    const [toDo, setToDo] = useState('')

    const addToDo = useCallback(() => {

        props.addToDo(toDo)
        setToDo('')
    },[props.addToDo])

    const onChangeToDo = (e: ChangeEvent<HTMLInputElement>) => {
        setToDo(e.currentTarget.value)

    }

    return (
        <div style={{margin:'10px'}}>
            <TextField
                onChange={onChangeToDo}
                value={toDo}
                label="Add ToDo-List"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FormatListNumberedIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <IconButton aria-label="delete" onClick={addToDo}>
                <LibraryAddIcon fontSize="large"/>
            </IconButton>

        </div>
    )
})