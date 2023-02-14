import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getListById, getListsByUser } from "../../modules/listManager";
import { addNote } from "../../modules/noteManager";
import { currentUser } from "../../modules/userManager";

export const CreateNoteForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [newNote, setNewNote] = useState({});
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
        else {
            copy.listId = null;
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

            <h3>Create New Note</h3>
            <form onSubmit={(e) => {
                e.preventDefault()

                addNewNote()
            }}>
                <fieldset>
                    <h5>Is This Note Related to a List? Which one?</h5>
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
                    <label htmlFor="dateCreated">Date Created</label>
                    <input type="date" name="dateCreated" onChange={changeState} value={newNote.dateCreated} />
                </fieldset>
                <fieldset>
                    <label htmlFor="text">Note Text</label>
                    <input type="text" name="text" onChange={changeState} value={newNote.text} />
                </fieldset>
                <input type="submit" value="Submit" />
            </form>
        </section>
    </>)
}