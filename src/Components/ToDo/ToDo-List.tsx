import React, {ChangeEvent, useState} from "react";
import {filterType, taskType} from "./ToDo";
import {Button, ButtonGroup, Checkbox, IconButton, Paper, TextField} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./Editable-Span";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

type propsType = {
    tasks: Array<taskType>
    title: string
    id: string
    addTask: (todoID: string, taskName: string) => void
    deleteTask: (todoID: string, taskID: string) => void
    filterTask: (todoID: string, filter: filterType) => void
    changeCheckBox: (todoID: string, taskID: string, isDone: boolean) => void
    changeTaskName: (todoID: string, taskID: string, taskName: string) => void
    deleteToDo:(id:string) => void
}

const ToDoList = (props: propsType) => {

    const [taskName, setTaskName] = useState('')
    const [error, setError] = useState('')

    const onAddTask = () => {
        if (taskName.trim() !== '') {
            props.addTask(props.id, taskName)
            setTaskName('')
            setError('')
        } else setError('Incorrect entry.')
    }
    const taskOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value)
    }

    return (
        <Paper style={{padding:'10px'}} elevation={3}>

            <h3>
                {props.title ? `${props.title}` : 'ToDo'}
                <IconButton onClick={() => props.deleteToDo(props.id)}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>

            <TextField
                size='small'
                error={!!error}
                label="Add task"
                variant="outlined"
                onChange={taskOnChange}
                value={taskName}
                helperText={error}
            />

            <IconButton onClick={onAddTask}>
                <PlaylistAddIcon/>
            </IconButton>

            {
                props.tasks.map(el => {

                    let onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckBox(props.id, el.id, e.currentTarget.checked)
                    }
                    const onchangeTaskName = (taskName: string) => {
                        props.changeTaskName(props.id, el.id, taskName)
                    }

                    return (
                        <div>
                            <Checkbox
                                checked={el.isDone}
                                onChange={onChangeHandler}
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
                            {' '}
                            <EditableSpan value={el.title} changeTaskName={onchangeTaskName}/>
                            <IconButton aria-label="delete" onClick={() => props.deleteTask(props.id, el.id)}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })
            }
            <div>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => props.filterTask(props.id, 'all')}>All</Button>
                    <Button onClick={() => props.filterTask(props.id, 'active')}>Active</Button>
                    <Button onClick={() => props.filterTask(props.id, 'completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </Paper>
    )
}

export default ToDoList
