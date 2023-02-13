import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getListsByUser } from "../../modules/listManager";
import { addNote } from "../../modules/noteManager";
import { currentUser } from "../../modules/userManager";

export const CreateNoteForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [newNote, setNewNote] = useState({});
    const [allLists, setAllLists] = useState([]);
    const [chosenList, setChosenList] = useState({});




    const getlists = () => {
        getListsByUser(user.id).then(lists => setAllLists(lists));

    }

    useEffect(() => {

        currentUser().then(u => setUser(u));
    }, []);

    useEffect((e) => {
        getlists();
    }, [user])

    const onSelect = (e) => {
        e.target.type = "option"
            ? <>
                {newNote.tags}
            </>
            : <>
            </>
    };

    const changeState = (e) => {
        const copy = { ...newNote }
        copy[e.target.name] = e.target.value
        setNewNote(copy)
    };

    const addNewNote = () => {
        newNote.userId = user.id;
        addNote(newNote)
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

                addNote()
            }}>
                <fieldset>
                    <h5>Is This Note Related to a List? Which one?</h5>
                    <select>
                        <option>Please Select A List</option>
                        {
                            allLists.map((l) => {
                                return <option value={l.id} onChange={onSelect}>{l.listName}</option>

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