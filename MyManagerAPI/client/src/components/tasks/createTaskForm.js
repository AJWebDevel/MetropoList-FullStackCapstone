import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getListsByUser } from "../../modules/listManager";
import { addTask } from "../../modules/taskManager";
import { currentUser } from "../../modules/userManager";

export const CreateTaskForm = () => {
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState({});
    const [user, setUser] = useState({});
    const [allLists, setAllLists] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {

        currentUser().then(u => {
            setUser(u)
            getListsByUser(u.id).then(lists => setAllLists(lists));

        });
    }, []);

    const onSelect = (e) => {
        setSelectedOption(parseInt(e.target.value))
    }

    const changeState = (e) => {
        const copy = { ...newTask }
        copy[e.target.name] = e.target.value
        setNewTask(copy)
    };

    const addTaskToList = () => {
        const copy = { ...newTask }
        copy.userId = user.id;
        copy.listId = selectedOption;
        addTask(copy)
            .then(resp => {
                if (resp.ok)
                    navigate(`/singleList/${selectedOption}`)
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
                    <h5> Which List is This Task Related to?</h5>
                    <select onChange={onSelect} value={selectedOption} >
                        <option value={0}>Please Select A List</option>
                        {
                            allLists.map((l) => {
                                return <option key={l.id} value={l.id}>{l.listName}</option>

                            })
                        }
                    </select>
                </fieldset>
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