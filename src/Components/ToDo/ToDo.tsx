import React, {useState} from 'react'
import {v1} from "uuid";
import {MultiInput} from "./Multi-Input";
import ToDoList from "./ToDo-List";
import {Grid} from "@material-ui/core";

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

    const taskID1 = v1()
    const taskID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListsType>>([
        {id: taskID1, title: 'Shopping', filter: 'all'},
        {id: taskID2, title: 'Skills', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<tasksType>({
        [taskID1]: [
            {id: v1(), title: 'Notebook', isDone: false},
            {id: v1(), title: 'Mazda', isDone: false}
        ],
        [taskID2]: [
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JS', isDone: false}
        ]
    })

    const addToDo = (title: string) => {
        let toDoID = v1()
        let newToDo = {id: toDoID, title: title, filter: 'all'}
        setTodoLists([newToDo, ...todoLists])
        setTasks({...tasks, [toDoID]: []})
    }

    const deleteToDo = (id: string) => {
        let newArray = todoLists.filter(el => el.id !== id)
        setTodoLists(newArray)
    }

    const addTask = (todoID: string, taskName: string) => {
        tasks[todoID] = [{id: v1(), title: taskName, isDone: false}, ...tasks[todoID]]
        setTasks({...tasks})
    }
    const deleteTask = (todoID: string, taskID: string) => {
        const newTasks = tasks[todoID]
        tasks[todoID] = newTasks.filter(el => el.id !== taskID)
        setTasks({...tasks})
    }
    const filterTask = (todoID: string, filter: filterType) => {
        let filterTodoLists = todoLists.find(el => el.id === todoID)
        if (filterTodoLists) {
            filterTodoLists.filter = filter
        }
        setTodoLists([...todoLists])
    }
    const changeCheckBox = (todoID: string, taskID: string, isDone: boolean) => {
        let task = tasks[todoID].find(el => el.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }
    const changeTaskName = (todoID: string, taskID: string, taskName: string) => {
        let task = tasks[todoID].find(el => el.id === taskID)
        if (task) {
            task.title = taskName
        }
        setTasks({...tasks})
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