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
            <h3 className="font-metro text-center text-white pt-4 text-3xl underline decoration-double underline-offset-4">Create New Task</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                addTaskToList();
            }}
                className="shadow-xl rounded px-8 pt-6 pb-8 mb-4 m-8 border-2 bg-forrest flex flex-col text-white font-techno items-center">
                <fieldset>
                    <h5> Which List is This Task Related to?</h5>
                    <div className="flex flex-col m-4">
                        <select onChange={onSelect} value={selectedOption} className="text-black">
                            <option value={0}>Please Select A List</option>
                            {
                                allLists.map((l) => {
                                    return <option key={l.id} value={l.id}>{l.listName}</option>

                                })
                            }
                        </select>
                    </div>

                </fieldset>
                <fieldset className="p-4 ">
                    <label className="m-4" htmlFor="dateDue">Date Due</label>
                    <input className="text-black" name="dateDue" type="date" onChange={changeState} />
                </fieldset>
                <fieldset className="p-4 ">
                    <label className="m-4" htmlFor="isImportant">Is this Task Important?</label>
                    {/* //onchange true false */}
                    <input name="isImportant" type="checkbox" />
                </fieldset>
                <fieldset className="p-4 ">
                    <label className="m-4" htmlFor="title">Title</label>
                    <input className="text-black" name="title" type="text" onChange={changeState} />
                </fieldset>
                <fieldset className="p-4 ">
                    <label className="m-4" htmlFor="description">Description</label>
                    <input className="text-black" name="description" type="text" onChange={changeState} />
                </fieldset>
                <input type="submit" value="Submit" className=" p-1 m-4 hover:underline border-white border-2 rounded bg-maroon" />
            </form>
        </section>
    </>)
}