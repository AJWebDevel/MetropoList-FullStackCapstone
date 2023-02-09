import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getNoteByUser } from "../../modules/noteManager";
import { currentUser } from "../../modules/userManager";

export const NotesByUser = () => {
    const { id } = useParams();
    const [note, setNote] = useState({});


    useEffect(() => {

        getNoteByUser(id).then(setNote)
    }, []);

    return (<div>
        <h2>My Notes</h2>

        <div>
            <p>Note{note.id}</p>
        </div>

    </div>
    )
}