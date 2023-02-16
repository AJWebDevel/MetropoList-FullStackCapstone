import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteList, getListById, getListsByUser } from "../../modules/listManager";
import { addListTag, deleteListTag, getListTagsByListId } from "../../modules/listTagManager";
import { addTag, deleteTag, getAllTags } from "../../modules/tagManager";
import { deleteTask } from "../../modules/taskManager";
import { currentUser } from "../../modules/userManager";
import { NewListTagForm } from "./addListTagForm";


export const SingleList = () => {
    const [user, setUser] = useState({});
    const [list, setList] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);



    useEffect(() => {
        currentUser().then(user => setUser(user));
    }, []);


    useEffect((e) => {

        getListById(id).then((l) => setList(l))

    }, [user]);

    useEffect((e) => {

        getListTagsByListId(id).then((t) => setTags(t))

    }, [user]);



    return (<section className="flex flex-col items-center p-6 ">
        <p className="text-white font-metro text-2xl underline m-2">{list.listName}</p>

        {list.userId == user.id ?
            <div className="border-4 rounded p-8 bg-forrest text-white font-techno">

                <div>
                    <p className="underline font-bold">
                        Labels
                    </p>
                    {tags.map((ts) => {
                        return <div key={ts.id}>
                            <p className="font-bold">{ts?.tag?.tagName}</p>
                            <button onClick={() => { deleteListTag(ts.id) }}
                                className="hover:underline bg-liteSoot h-8 w-40 text-sm flex justify-center rounded border-white border-2 p-1 m-4 ">Delete Tag</button>
                        </div>
                    })}
                </div>

                <div className="flex justify-center p-4">
                    <NewListTagForm />
                </div>
                <p className="text-lg p-4">Created: {list.dateCreated}</p>
                <div className="border-2 p-2 rounded">
                    <b className="underline">To-Dos</b>
                    {list?.tasks?.map((t) => {

                        return <div key={t.id} className="border-2 rounded  bg-maroon m-2">
                            <div className="border-2 p-2 m-2 bg-forrest rounded">
                                <p className="underline" >{t?.title}</p>
                                <p>{t?.description}</p>
                            </div>
                            <div>
                                <button onClick={() => deleteTask(t.id)}
                                    className="hover:underline bg-liteSoot h-8 w-40 text-sm flex justify-center rounded border-white border-2 p-1 m-4 ">Delete To-Do</button></div>
                        </div>

                    })}
                    <div className="flex justify-center">
                        <button onClick={() => navigate(`/createTaskForm`)}
                            className="hover:underline bg-liteSoot h-8 w-40 text-sm  rounded border-white border-2 p-1 m-4 ">Create New To-Do</button>
                    </div>

                </div>
                <div className="flex justify-center m-4">
                    <Link to={`/editListForm/${list.id}`}
                        className="hover:underline  box-content h-4 pt-2 w-40 rounded p-4 border-4 text-lg rounded bg-maroon text-white text-center ">Edit Docket</Link>
                </div>


            </div>
            : <div className="flex flex-col items-center text-white text-center p-6">
                <p>Created {list.dateCreated}</p>
                {list?.tasks?.map((t) => {
                    return <div key={t.id} className="border-2 rounded  bg-maroon m-2">
                        <div className="border-2 p-2 m-2 bg-forrest rounded">
                            <p >To-Do: {t?.title}</p>
                            <p>{t?.description}</p>
                        </div>
                    </div>
                })}

            </div>
        }




    </section>)
}