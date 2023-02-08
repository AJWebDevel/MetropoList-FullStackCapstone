import { useEffect, useState } from "react"
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
                </div>
            ))
        }
    </section>
    )
}