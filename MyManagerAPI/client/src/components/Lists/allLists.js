import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllLists } from "../../modules/listManager";

export const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        getAllLists().then(setLists)
    }, []);

    return (<section className="text-white">
        <h2 className="text-2xl font-metro text-center mt-10 underline text-white">All Lists</h2>
        {
            lists.map((l) => (
                <div key={l.id} className="font-techno text-center border-white border-2 m-8 p-6 bg-forrest shadow-xl rounded">
                    <p className="text-xl m-2 underline" >{l.listName}</p>
                    {l.tags.map((t) => {
                        <p>{t.tag.TagName}</p>
                    })}
                    <p>Created {l.dateCreated}</p>
                    <p>By User {l.userId}</p>
                    {l.tasks.map((task) => {
                        <div>
                            <p>{task.title}</p>
                            <p>{task.isImportant}</p>
                        </div>
                    })}
                    <div className="border-black border-2 rounded p-1 bg-maroon text-white m-2">
                        <Link to={`/singleList/${l.id}`}>Details</Link>
                    </div>


                </div>
            ))
        }

    </section>
    )
}