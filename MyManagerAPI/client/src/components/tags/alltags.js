import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { deleteTag, getAllTags } from "../../modules/tagManager";

export const AllTags = () => {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState({});

    useEffect(() => {
        getAllTags().then(setTags)
    }, []);



    return (<section className=" rounded px-8 pt-6 pb-8 mb-4 m-8 text-center text-white font-techno items-center">
        <h2 className="font-metro text-3xl underline decoration-double underline-offset-4">All Tags</h2>
        <div className="shadow-2xl border-2 m-4 rounded bg-maroon font-techno">
            {//change window reload to reget
                tags.map((t) => (
                    <div key={t.id} className="p-4 bg-forrest border-2 m-6">
                        <p className="text-xl underline p-1 underline-offset-2 decoration-maroon">{t.tagName}</p>

                        <button onClick={() => { deleteTag(t.id).then(window.location.reload()) }}
                            className="border-2 p-1 rounded ">Delete</button>
                    </div>
                ))
            }
        </div>
        <div className="flex justify-end ">
            <div className="border-2 bg-forrest rounded  p-2 ">
                <Link to="/createTagForm">Create New Tag</Link>
            </div>
        </div>
    </section>
    )
}