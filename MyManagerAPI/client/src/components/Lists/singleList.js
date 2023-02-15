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



    return (<section>


        {list.userId == user.id ?
            <>
                <p>{list.listName}</p>
                {tags.map((ts) => {
                    return <div key={ts.id}>
                        <p >{ts?.tag?.tagName}</p>
                        <button onClick={() => { deleteListTag(ts.id) }}>Delete Tag</button>
                    </div>
                })}
                <div>
                    <NewListTagForm />
                </div>
                <p>{list.dateCreated}</p>
                <div>
                    <b>Tasks</b>
                    {list?.tasks?.map((t) => {

                        return <div key={t.id}><p >{t?.title}</p>
                            <button onClick={() => navigate(`/editTaskForm/${id}`)}>Edit Task</button>
                            <button onClick={() => deleteTask(t.id)}>Delete Task</button></div>

                    })}
                    <div>
                        <button onClick={() => navigate(`/createTaskForm`)}>Create New Task</button>
                    </div>

                </div>

                <Link to={`/editListForm/${list.id}`}>Edit List </Link>

            </>
            : <><p>{list.listName}</p>
                {list?.tasks?.map((t) => {
                    return <p key={t.id}>title{t?.title}</p>
                })}
                <p>{list.dateCreated}</p>
            </>
        }




    </section>)
}