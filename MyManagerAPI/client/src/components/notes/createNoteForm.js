import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getListsByUser } from "../../modules/listManager";
import { currentUser } from "../../modules/userManager";

export const CreateNoteForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [newNote, setNewNote] = useState({});
    const [allLists, setAllLists] = useState([]);
    const [chosenList, setChosenList] = useState({});



    useEffect(() => {
        const getlists = () => {
            getListsByUser(user.id).then(lists => setAllLists(lists))
        }
        currentUser().then(user => setUser(user)).then(getlists);
    }, []);

    const onSelect = (e) => {
        const copy = { ...chosenList }
        if (e.target.selected) {
            setChosenList(copy)
        }
    };

    const changeState = (e) => {
        const copy = { ...newNote }
        copy[e.target.name] = e.target.value
        setNewNote(copy)
    };




    return (<section>
        <h3>Create New Note</h3>
        <form>
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
    </section>)
}