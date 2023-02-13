import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { deleteNote, getNoteByUser } from "../../modules/noteManager";
import { currentUser } from "../../modules/userManager";

export const NotesByUser = () => {
    const { id } = useParams();
    const [notes, setNotes] = useState([]);


    useEffect(() => {

        getNoteByUser(id).then(setNotes)
    }, []);

    return (<div>
        <h2>My Notes</h2>

        <div>
            {notes.map((n) => {
                return <>
                    <p>Note {n.id}</p>
                    <p>{n.text}</p>
                    <button onClick={() => { deleteNote(n.id).then(window.location.reload()) }}>Delete Note</button>
                </>
            })}
        </div>
        <div>
            <Link to={`/createNoteForm`}>Create New Note</Link>
        </div>


    </div>
    )
}