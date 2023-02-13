import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListById, getListsByUser } from "../../modules/listManager";
import { getListTagsByListId } from "../../modules/listTagManager";
import { currentUser } from "../../modules/userManager";


export const SingleList = () => {
    const [user, setUser] = useState({});
    const [list, setList] = useState({});
    const { id } = useParams();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        currentUser().then(user => setUser(user));
    }, []);


    useEffect((e) => {

        getListById(id).then((l) => setList(l))

    }, [user]);

    useEffect((e) => {

        getListTagsByListId(user.id).then((t) => setTags(t))

    }, [user]);



    return (<section>

        {list.userId == user.id ?
            <>
                <p>{list.listName}</p>
                {list?.tags?.map((ts) => {
                    return <>
                        <p>{ts?.tag?.tagName}</p>
                        <button>Delete Tag</button>
                    </>
                })}
                <p>{list.dateCreated}</p>
                <div>
                    <b>Tasks</b>
                    {list?.tasks?.map((t) => {
                        return <><p>{t?.title}</p>
                            <button onClick={() => navigate(`/editTaskForm/${id}`)}>Edit Task</button>
                            <button>Delete Task</button></>
                    })}
                    <div>
                        <button onClick={() => navigate(`/createTaskForm`)}>Create New Task</button>
                    </div>

                </div>

                <Link to={`/editListForm/${list.id}`}>Edit List </Link>

            </>
            : <><p>{list.listName}</p>
                {list?.tasks?.map((t) => {
                    return <p>title{t?.title}</p>
                })}
                <p>{list.dateCreated}</p>
            </>
        }




    </section>)
}