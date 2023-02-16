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

    return (<div className="flex flex-col items-center p-6 ">
        <h2 className="text-2xl text-center font-metro text-3xl underline decoration-double text-white mb-6 mt-6 " >Notes</h2>

        <div className="text-center shadow-xl flex flex-col pl-12 pr-12 border-liteSoot border-4 p-4 mt-2 shadow-md m-10  bg-maroon rounded font-techno text-white">
            {notes.map((n) => {
                return <section key={n.id}
                    className="border-2 p-8 m-8 rounded bg-forrest shadow-2xl">
                    <p className="text-xl p-2 underline underline-offset-2">Note {n.id}</p>
                    <p className="p-2 m-4 ">{n.text}</p>
                    <div className="flex flex-col items-center">
                        <button onClick={() => { deleteNote(n.id).then(window.location.reload()) }}
                            className="hover:underline bg-liteSoot h-10 w-40 flex justify-center text-center rounded border-white border-2 p-4 m-4 pb-10">Delete Note</button>
                    </div>
                </section>
            })}
        </div>
        <div className="hover:underline border-liteSoot text-center box-content h-12 w-32 p-4 border-4 text-lg rounded bg-maroon text-white  ">
            <Link to={`/createNoteForm`}>Create New Note</Link>
        </div>


    </div>
    )
}