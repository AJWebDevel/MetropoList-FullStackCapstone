import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { deleteTag, getAllTags } from "../../modules/tagManager";

export const AllTags = () => {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState({});

    useEffect(() => {
        getAllTags().then(setTags)
    }, []);



    return (<section>
        <h2>All Tags</h2>
        {
            tags.map((t) => (
                <div>
                    <p>{t.tagName}</p>
                    <button onClick={() => { deleteTag(t.id).then(window.location.reload()) }}>Delete</button>
                </div>
            ))
        }
        <Link to="/createTagForm">Create New Tag</Link>
    </section>
    )
}