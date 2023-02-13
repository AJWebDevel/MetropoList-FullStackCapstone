import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editTask, getTaskById } from "../../modules/taskManager";


export const EditTaskForm = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState({});
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getTaskById(id).then(setTask)
    }, []);

    const changeState = (e) => {
        const copy = { ...task }
        copy[e.target.name] = e.target.value
        setTask(copy)
    };



    const updateTask = () => {
        //set task.listid to list id using props(?)
        editTask(task)
        // .then(resp => {
        //     if (resp.ok)
        //         navigate(`/singleList/${list.id}`)
        // })
    }

    return (<>
        <section>
            <h3>Edit Task</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                updateTask();
            }}>

                <fieldset>
                    <label htmlFor="dateDue">Date Due</label>
                    <input name="dateDue" type="date" onChange={changeState} value={task.dateDue} />
                </fieldset>
                <fieldset>
                    <label htmlFor="isImportant">Is this Task Important?</label>
                    {/* //onchange true false */}
                    <input name="isImportant" type="checkbox" />
                </fieldset>
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" onChange={changeState} value={task.title} />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" onChange={changeState} value={task.description} />
                </fieldset>
                <input type="submit" value="Submit" />
            </form>
        </section>
    </>)
}