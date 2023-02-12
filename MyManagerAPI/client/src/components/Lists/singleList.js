import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { getListById, getListsByUser } from "../../modules/listManager";
import { currentUser } from "../../modules/userManager";


export const SingleList = () => {
    const [user, setUser] = useState({});
    const [list, setList] = useState({});
    const { id } = useParams();


    useEffect(() => {
        currentUser().then(user => setUser(user));
    }, []);


    useEffect(() => {

        getListById(id).then((l) => setList(l))

    }, []);



    return (<section>

        {list.userId == user.id ?
            <>
                <p>{list.listName}</p>
                <p>{list.dateCreated}</p>
                <Link to={`/editListForm/${list.id}`}>Edit List </Link>

            </>
            : <><p>{list.listName}</p>
                <p>{list.dateCreated}</p>
            </>
        }




    </section>)
}