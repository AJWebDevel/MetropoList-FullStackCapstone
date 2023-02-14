import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getListsByUser } from "../../modules/listManager";
import { editTask, getTaskById } from "../../modules/taskManager";
import { currentUser } from "../../modules/userManager";


export const EditTaskForm = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState({});
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [allLists, setAllLists] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {

        currentUser().then(u => {
            setUser(u)
            getListsByUser(u.id).then(lists => setAllLists(lists));

        });
    }, []);

    useEffect(() => {
        getTaskById(id).then((t) => {

            let date = new Date(t.dateDue)
            t.formattedDate = date.toISOString().split('T')[0]
            setTask(t);
        })
    }, []);

    console.log(task)
    const changeState = (e) => {
        const copy = { ...task }
        copy[e.target.name] = e.target.value
        setTask(copy)
    };
    const onSelect = (e) => {
        setSelectedOption(parseInt(e.target.value))
    }


    const updateTask = () => {
        const copy = { ...task };
        copy.userId = user.id
        copy.listid = selectedOption;
        editTask(task)
            .then(resp => {
                if (resp.ok)
                    navigate(`/singleList/${task.id}`)
            })
    }

    return (<>
        <section>
            <h3>Edit Task</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                updateTask();
            }}>
                <fieldset>
                    <h5> Which List is This Task Related to?</h5>
                    <select onChange={onSelect} value={selectedOption} >
                        <option value={task.listId}>Please Select A List</option>
                        {
                            allLists.map((l) => {
                                return <option key={l.id} value={l.id}>{l.listName}</option>

                            })
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="dateDue">Date Due</label>
                    <input name="dateDue" type="date" onChange={changeState} value={task.formattedDate} />
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