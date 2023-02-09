import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListsByUser } from "../../modules/listManager";
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
                <div>
                    <p>{uL.listName}</p>
                    <p> {uL.tasks.map((t) => {
                        <p>{t.title}</p>
                    })}</p>
                </div>
            ))
        }
    </section>)
}