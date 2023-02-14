import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteList, getListsByUser } from "../../modules/listManager";
import { currentUser } from "../../modules/userManager";


export const ListByUser = () => {
    const { id } = useParams();
    const [userLists, setUserLists] = useState([]);

    useEffect(() => {
        getListsByUser(id).then((u) => setUserLists(u));
    }, []);


    return (<section>
        <h2>my Lists</h2>
        {
            userLists.map((uL) => (
                <div key={uL.id}>
                    <p>{uL.listName}</p>

                    <Link to={`/singleList/${uL.id}`}>Details</Link>
                    <button onClick={() => { deleteList(uL.id).then(window.location.reload()) }}>Delete List</button>
                </div>
            ))
        }
        <Link to={"/createListForm"}>Create New List</Link>

    </section>)
}