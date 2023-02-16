import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getListById, getListsByUser } from "../../modules/listManager";
import { addNote } from "../../modules/noteManager";
import { currentUser } from "../../modules/userManager";

export const CreateNoteForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [newNote, setNewNote] = useState({ text: "", listId: 0 });
    const [allLists, setAllLists] = useState([]);
    const [chosenList, setChosenList] = useState({});
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {

        currentUser().then(u => {
            setUser(u)
            getListsByUser(u.id).then(lists => setAllLists(lists));

        });
    }, []);



    const changeState = (e) => {
        const copy = { ...newNote }
        copy[e.target.name] = e.target.value
        setNewNote(copy)

    };
    const onSelect = (e) => {

        setSelectedOption(parseInt(e.target.value))

    };

    const addNewNote = () => {
        const copy = { ...newNote }
        if (selectedOption) {
            copy.listId = selectedOption;
        }


        copy.userId = user.id;
        addNote(copy)
            .then(resp => {
                if (resp.ok)
                    navigate(`/NotesByUser/${user.id}`)
            })
    }




    return (<>
        <section>

            <h3 className=" text-center text-white  pt-12 font-metro text-3xl underline decoration-double underline-offset-4">Create New Note</h3>
            <form onSubmit={(e) => {
                e.preventDefault()

                addNewNote()
            }}
                className="bg-forrest shadow-2xl font-techno shadow-md rounded px-8 pt-6 pb-8 mb-4 m-8 border-2 border-white flex flex-col text-white font-techno items-center">
                <fieldset className="m-2 p-2">
                    <h5 className="text-lg">Is This Note Related to a List? Which one?</h5>
                    <div className="flex flex-col">
                        <select onChange={onSelect} value={selectedOption}
                            className="text-black" >
                            <option value={0}>Please Select A List</option>
                            {
                                allLists.map((l) => {
                                    return <option key={l.id} value={l.id}>{l.listName}</option>

                                })
                            }
                        </select>
                    </div>

                </fieldset>
                <fieldset className="m-2 p-2">
                    <label className="m-4 text-lg" htmlFor="dateCreated">Date Created</label>
                    <input className="text-black" type="date" name="dateCreated" onChange={changeState} value={newNote.dateCreated} />
                </fieldset>
                <fieldset>
                    <label className="m-4 block text-lg" htmlFor="text">Note Text</label>
                    <input className="text-black inline-block w-full " type="text" name="text" onChange={changeState} value={newNote.text} />
                </fieldset>
                <input type="submit" value="Submit" className=" p-1 m-4 hover:underline border-white border-2 rounded bg-maroon" />
            </form>
        </section>
    </>)
}