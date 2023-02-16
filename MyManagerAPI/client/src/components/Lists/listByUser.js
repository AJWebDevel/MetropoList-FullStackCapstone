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


    return (<section className="flex flex-col items-center p-6 ">
        <h2 className="text-2xl text-center font-metro text-3xl underline text-white mb-6 mt-6 " >My Lists</h2>
        <div className="text-center shadow-xl flex flex-col pl-12 pr-12 border-liteSoot border-4 p-4 mt-2 shadow-md m-10  bg-maroon rounded font-techno text-white">
            {
                userLists.map((uL) => (
                    <div key={uL.id}
                        className="border-2 p-8 m-8 rounded bg-forrest shadow-2xl">
                        <p className="text-xl underline underline-offset-2">{uL.listName}</p>
                        <div className=" bg-liteSoot h-10 w-40 flex justify-center rounded border-white border-2 p-4 m-4 pb-10">
                            <Link to={`/singleList/${uL.id}`} className="hover:underline" >Details</Link>
                        </div>

                        {/* //no reload, go get all */}
                        <button onClick={() => { deleteList(uL.id).then(window.location.reload()) }}
                            className="hover:underline bg-liteSoot h-10 w-40 flex justify-center rounded border-white border-2 p-4 m-4 pb-10">Delete List</button>
                    </div>
                ))
            }
        </div>
        <div className="hover:underline border-liteSoot box-content h-10 w-32 p-4 border-4 text-lg rounded bg-maroon text-white text-center ">
            <Link to={"/createListForm"}>Create New List</Link>
        </div>


    </section>)
}