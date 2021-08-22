import React, {ChangeEvent, useCallback, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


type propsType = {
    addToDo: (title: string) => void
}

export const MultiInput = React.memo((props:propsType) => {

    const [toDo, setToDo] = useState('')

    const addToDo = useCallback(() => {

        props.addToDo(toDo)
        setToDo('')
    },[props.addToDo,toDo])

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