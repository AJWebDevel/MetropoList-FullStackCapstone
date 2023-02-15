import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteList, getListsByUser } from "../../modules/listManager";
import { currentUser } from "../../modules/userManager";


export const ListByUser = () => {
    const { id } = useParams();
    const [userLists, setUserLists] = useState([]);
    const [user, setUser] = useState({});


    useEffect(() => {
        currentUser().then(user => setUser(user));
    }, []);

    useEffect(() => {
        getListsByUser(id).then((u) => setUserLists(u));
    }, []);


    return (<section>
        <h2 className="text-2xl text-center" >My Lists</h2>
        <div className="text-center flex flex-col p-3">
            {
                userLists.map((uL) => (
                    <div key={uL.id}>
                        <p>{uL.listName}</p>

                        <Link to={`/singleList/${uL.id}`}>Details</Link>
                        //no reload, go get all
                        <button onClick={() => { deleteList(uL.id).then(window.location.reload()) }}>Delete List</button>
                    </div>
                ))
            }
        </div>
        <div className="box-content h-20 w-32 p-4 border-4 ">
            <Link to={"/createListForm"}>Create New List</Link>
        </div>


    </section>)
}