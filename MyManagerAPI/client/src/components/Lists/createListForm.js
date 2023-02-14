import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { addList, editList, getListById } from "../../modules/listManager";
import { addListTag } from "../../modules/listTagManager";
import { getAllTags } from "../../modules/tagManager";
import { currentUser } from "../../modules/userManager";

export const CreateListForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [newList, setNewList] = useState({});
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([])
    const [tag, setTag] = useState({});

    useEffect(() => {
        getAllTags().then(tags => setTags(tags));
    }, []);

    useEffect(() => {
        currentUser().then(user => setUser(user));
    }, []);

    const changeState = (e) => {

        const copy = { ...newList }
        if (e.target.type == "checkbox") {
            copy[e.target.name] = e.target.checked;
        } else {
            copy[e.target.name] = e.target.value
        }
        //iftype is checkbox- use e.target.event
        setNewList(copy)
    }

    const onCheck = (e) => {
        const copy = { ...tag }

        if (e.target.checked) {
            setTag(copy)
            console.log(tag)

            setSelectedTags(tags);
        }
    };

    const addNewList = () => {
        newList.userId = user.id;
        addList(newList)
            .then(resp => {
                if (resp.ok)
                    selectedTags.length > 0
                        ? selectedTags.map((s) => {
                            addListTag(s)
                            navigate(`/listByUser/${user.id}`)
                        })
                        : navigate(`/listByUser/${user.id}`)

            })
    }


    return (<div>

        <form onSubmit={(e) => {
            e.preventDefault()

            addNewList()
        }}>


            <fieldset>


                {tags.map((t) => {
                    return <>
                        <label htmlFor="listTags">{t.tagName}</label>
                        {/* //event listener */}
                        <input type="checkbox" name="listTags" onChange={onCheck} value={t} />
                    </>
                })}


            </fieldset>
            <fieldset>
                <label htmlFor="listName">List Name</label>
                <input name="listName" onChange={changeState} value={newList.listName} />
            </fieldset>
            <fieldset>
                <label htmlFor="isImportant">Make List Important?</label>
                <input name="isImportant" type="checkbox" onChange={changeState} />
            </fieldset>
            <fieldset>
                <label htmlFor="isPrivate">Make List Private?</label>
                <input name="isPrivate" type="checkbox" onChange={changeState} />
            </fieldset>
            <fieldset>
                <label htmlFor="dateCreated">Date Created</label>
                <input name="dateCreated" type="date" onChange={changeState} />
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    </div>)
}