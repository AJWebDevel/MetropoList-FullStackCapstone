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
            <h3 className="font-metro text-center text-white pt-4 text-3xl underline decoration-double underline-offset-4">Edit Task</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                updateTask();
            }}
                className="shadow-xl rounded px-8 pt-6 pb-8 mb-4 m-8 border-2 bg-forrest flex flex-col text-white font-techno items-center">
                <fieldset className="p-4 ">
                    <h5 className="text-lg"> Which List is This Task Related to?</h5>
                    <div className="flex flex-col">
                        <select onChange={onSelect} value={selectedOption} className="text-black" >
                            <option value={task.listId}>Please Select A List</option>
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
                    <input className="text-black" name="dateDue" type="date" onChange={changeState} value={task.formattedDate} />
                </fieldset>
                <fieldset className="p-4 ">
                    <label className="m-4" htmlFor="isImportant">Is this Task Important?</label>
                    {/* //onchange true false */}
                    <input name="isImportant" type="checkbox" />
                </fieldset>
                <fieldset className="p-4 ">
                    <label className="m-4" htmlFor="title">Title</label>
                    <input className="text-black" name="title" type="text" onChange={changeState} value={task.title} />
                </fieldset>
                <fieldset className="p-4 ">
                    <label className="m-4" htmlFor="description">Description</label>
                    <input className="text-black" name="description" type="text" onChange={changeState} value={task.description} />
                </fieldset>
                <input type="submit" value="Submit" className=" p-1 m-4 hover:underline border-white border-2 rounded bg-maroon" />
            </form>
        </section>
    </>)
}