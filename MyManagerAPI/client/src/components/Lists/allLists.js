import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getAllLists } from "../../modules/listManager";

export const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        getAllLists().then(setLists)
    }, []);

    return (<section>
        <h2>All Lists</h2>
        {
            lists.map((l) => (
                <div>
                    <p>{l.listName}</p>
                    {l.tags.map((t) => {
                        <p>{t.tag.TagName}</p>
                    })}
                    {l.dateCreated}
                    {l.tasks.map((task) => {
                        <div>
                            <p>{task.title}</p>
                            <p>{task.isImportant}</p>
                        </div>
                    })}
                    <Link to={`/singleList/${l.id}`}>Details</Link>

                </div>
            ))
        }

    </section>
    )
}