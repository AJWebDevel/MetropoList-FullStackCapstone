import { useEffect, useState } from "react";
import { getListsByUser } from "../../modules/listManager";
import { currentUser } from "../../modules/userManager";


export const ListByUser = () => {

    const [userLists, setUserLists] = useState([]);

    useEffect(() => {
        getListsByUser().then(setUserLists);
    }, []);

    return (<section>
        <h2>my Lists</h2>
        {

        }
    </section>)
}