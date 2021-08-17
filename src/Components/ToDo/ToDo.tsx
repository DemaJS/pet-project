import React, {useCallback, useEffect} from 'react'
import {MultiInput} from "./Multi-Input";
import ToDoList from "./ToDo-List";
import {Grid} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {
    addToDoThunk,
    deleteToDoThunk,
    filterTaskAC,
    setToDoThunk
} from "../../Reducers/ToDoLists-Reducer";
import {
    addTaskThunk,
    changeCheckBoxAC,
    changeTaskNameAC,
    deleteTaskThunk
} from "../../Reducers/ToDoTasks-Reducer";
import {statusType} from "../../Reducers/App-reducer";
import {ErrorSnackbar} from "../Utils/Error-Component";


export type todoListsType = {
    id: string
    title: string
    filter: filterType
    entityStatus: boolean
}

export type taskType = {
    id: string
    title: string
    isDone: boolean
    entityStatusTask:boolean
}
export type tasksType = {
    [key: string]: Array<taskType>
}
export type filterType = 'all' | 'active' | 'completed'

function ToDo() {

    const todoLists = useSelector<AppStateType,Array<todoListsType>>(state => state.lists)
    const tasks = useSelector<AppStateType,tasksType>(state => state.tasks)
    const loading = useSelector<AppStateType,statusType>(state => state.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToDoThunk())
    }, [])

    const addToDo = useCallback((title: string) => {
        dispatch(addToDoThunk(title))
    },[dispatch])

    const deleteToDo = useCallback( (id: string) => {
        dispatch(deleteToDoThunk(id))
    },[dispatch])

    const addTask = useCallback((todoID: string, taskName: string) => {
        dispatch(addTaskThunk(todoID,taskName))
    },[dispatch])

    const deleteTask = useCallback((todoID: string, taskID: string) => {
        dispatch(deleteTaskThunk(todoID,taskID))
    }, [dispatch])

    const filterTask = useCallback((todoID: string, filter: filterType) => {
        dispatch(filterTaskAC(todoID,filter))
    },[dispatch])

    const changeCheckBox = useCallback((todoID: string, taskID: string, isDone: boolean) => {
        dispatch(changeCheckBoxAC(todoID,taskID,isDone))
    },[dispatch])

    const changeTaskName = useCallback((todoID: string, taskID: string, taskName: string) => {
        dispatch(changeTaskNameAC(todoID,taskID,taskName))
    },[dispatch])

    return (

        <div style={{margin:'30px'}}>
            {loading === 'loading' && <LinearProgress/>}

            <ErrorSnackbar/>

            <Grid container>
                <MultiInput addToDo={addToDo}/>
            </Grid>

            <Grid container spacing={3}>
                {
                    todoLists.map(el => {

                            return (
                                <Grid item>
                                    <ToDoList
                                        filter={el.filter}
                                        key={el.id}
                                        tasks={tasks[el.id]}
                                        title={el.title}
                                        id={el.id}
                                        entityStatus = {el.entityStatus}
                                        addTask={addTask}
                                        deleteTask={deleteTask}
                                        filterTask={filterTask}
                                        changeCheckBox={changeCheckBox}
                                        changeTaskName={changeTaskName}
                                        deleteToDo={deleteToDo}
                                    />
                                </Grid>
                            )
                        }
                    )
                }
            </Grid>
        </div>
    )
}

export default ToDo