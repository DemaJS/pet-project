import React from 'react'
import {MultiInput} from "./Multi-Input";
import ToDoList from "./ToDo-List";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {addToDoAC, deleteToDoAC, filterTaskAC} from "../../Reducers/ToDoLists-Reducer";
import {addTaskAC, changeCheckBoxAC, changeTaskNameAC, deleteTaskAC} from "../../Reducers/ToDoTasks-Reducer";

export type todoListsType = {
    id: string
    title: string
    filter: string
}

export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type tasksType = {
    [key: string]: Array<taskType>
}
export type filterType = 'all' | 'active' | 'completed'

function ToDo() {


    const todoLists = useSelector<AppStateType,Array<todoListsType>>(state => state.lists)
    const tasks = useSelector<AppStateType,tasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const addToDo = (title: string) => {
        let action = addToDoAC(title)
        dispatch(action)
    }

    const deleteToDo = (id: string) => {
        dispatch(deleteToDoAC(id))
    }

    const addTask = (todoID: string, taskName: string) => {
        dispatch(addTaskAC(todoID,taskName))
    }
    const deleteTask = (todoID: string, taskID: string) => {
        dispatch(deleteTaskAC(todoID,taskID))
    }
    const filterTask = (todoID: string, filter: filterType) => {
        dispatch(filterTaskAC(todoID,filter))
    }
    const changeCheckBox = (todoID: string, taskID: string, isDone: boolean) => {
        dispatch(changeCheckBoxAC(todoID,taskID,isDone))
    }
    const changeTaskName = (todoID: string, taskID: string, taskName: string) => {
        dispatch(changeTaskNameAC(todoID,taskID,taskName))
    }

    return (

        <>
            <Grid container>
                <MultiInput addToDo={addToDo}/>
            </Grid>

            <Grid container spacing={3}>
                {
                    todoLists.map(el => {
                            let filterTasks = tasks[el.id]
                            if (el.filter === 'active') {
                                filterTasks = tasks[el.id].filter(t => !t.isDone)
                            }
                            if (el.filter === 'completed') {
                                filterTasks = tasks[el.id].filter(t => t.isDone)
                            }

                            return (
                                <Grid item>
                                    <ToDoList
                                        key={el.id}
                                        tasks={filterTasks}
                                        title={el.title}
                                        id={el.id}
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
        </>
    )
}

export default ToDo