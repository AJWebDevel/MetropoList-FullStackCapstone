import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteList, getListById, getListsByUser } from "../../modules/listManager";
import { addListTag, deleteListTag, getListTagsByListId } from "../../modules/listTagManager";
import { addTag, deleteTag, getAllTags } from "../../modules/tagManager";
import { deleteTask } from "../../modules/taskManager";
import { currentUser } from "../../modules/userManager";


export const SingleList = () => {
    const [user, setUser] = useState({});
    const [list, setList] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [optionalTags, setOptionalTags] = useState([]);
    const [newTag, setNewTag] = useState({});
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        getAllTags().then((t) => setOptionalTags(t))
    }, []);

    useEffect(() => {
        currentUser().then(user => setUser(user));
    }, []);


    useEffect((e) => {

        getListById(id).then((l) => setList(l))

    }, [user]);

    useEffect((e) => {

        getListTagsByListId(user.id).then((t) => setTags(t))

    }, [user]);

    const onSelect = (e) => {
        setSelectedOption(parseInt(e.target.value))
    }

    const addATag = () => {
        newTag.tagId = selectedOption;
        var correctTag = optionalTags.filter((o) => o.id = selectedOption)

        newTag.listId = parseInt(id);
        addListTag(newTag)
    }

    return (<section>

        {list.userId == user.id ?
            <>
                <p>{list.listName}</p>
                {list?.tags?.map((ts) => {
                    return <>
                        <p key={ts.id}>{ts?.tag?.tagName}</p>
                        <button onClick={() => { deleteListTag(ts.id) }}>Delete Tag</button>
                    </>
                })}
                <div>
                    <h6>Add New Tag?</h6>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        addATag()
                    }}>
                        <fieldset>
                            <select onChange={onSelect} value={selectedOption}>
                                <option value={0}>Please Choose Tag</option>
                                {optionalTags.map((oT => {
                                    return <>
                                        <option value={oT.id}>{oT.tagName}</option>
                                    </>
                                }))}


                            </select>
                        </fieldset>
                        <input type="submit" value="Submit" />


                    </form>
                </div>
                <p>{list.dateCreated}</p>
                <div>
                    <b>Tasks</b>
                    {list?.tasks?.map((t) => {

                        return <><p key={t.id}>{t?.title}</p>
                            <button onClick={() => navigate(`/editTaskForm/${id}`)}>Edit Task</button>
                            <button onClick={() => deleteTask(t.id)}>Delete Task</button></>

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