import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { addTask } from "../../modules/taskManager";

export const CreateTaskForm = () => {
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState({});
    const [user, setUser] = useState({});

    const changeState = (e) => {
        const copy = { ...newTask }
        copy[e.target.name] = e.target.value
        setNewTask(copy)
    };

    const addTaskToList = () => {
        //set task.listid to list id using props(?)
        addTask(newTask)
            .then(resp => {
                if (resp.ok)
                    navigate(`/singleList/${user.id}`)
            })
    }

    return (<>
        <section>
            <h3>Create New Task</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                addTaskToList();
            }}>

                <fieldset>
                    <label htmlFor="dateDue">Date Due</label>
                    <input name="dateDue" type="date" onChange={changeState} />
                </fieldset>
                <fieldset>
                    <label htmlFor="isImportant">Is this Task Important?</label>
                    {/* //onchange true false */}
                    <input name="isImportant" type="checkbox" />
                </fieldset>
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" onChange={changeState} />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" onChange={changeState} />
                </fieldset>
                <input type="submit" value="Submit" />
            </form>
        </section>
    </>)
}