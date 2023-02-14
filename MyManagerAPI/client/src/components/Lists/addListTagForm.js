import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getAllLists, getListsByUser } from "../../modules/listManager";
import { addListTag } from "../../modules/listTagManager";
import { getAllTags } from "../../modules/tagManager";
import { currentUser } from "../../modules/userManager";


export const NewListTagForm = () => {
    const navigate = useNavigate();
    const [newListTag, setNewListTag] = useState({});
    const [user, setUser] = useState({});
    //alltags
    const [tags, setTags] = useState([]);
    //alllists
    const [lists, setLists] = useState([])
    //selectedtag
    const [selectedTag, setSelectedTag] = useState(0)
    //selectedlist
    const [selectedList, setSelectedList] = useState(0)




    useEffect(() => {
        currentUser().then(u => {
            setUser(u)
            getListsByUser(u.id).then(lists => setLists(lists));
        })
    }, [])

    const onSelectList = (e) => {
        setSelectedList(parseInt(e.target.value))
    }

    const onSelectTag = (e) => {
        setSelectedTag(parseInt(e.target.value))
    }

    useEffect(() => {
        getAllTags().then((t) => setTags(t))
    }, [])

    const addListTagToList = () => {
        const copy = { ...newListTag }
        copy.listId = selectedList;
        copy.tagId = selectedTag
        addListTag(copy)
            .then(resp => {
                if (resp.ok)
                    navigate(`/singleList/${copy.listId}`)
            })
    }

    return (<>
        <section>
            <form onSubmit={(e) => {
                e.preventDefault();
                addListTagToList();
            }}>
                <fieldset>
                    <select onChange={onSelectTag} value={selectedTag}>
                        <option>Please Select A Tag</option>
                        {tags.map((t) => {
                            return <option key={t.id} value={t.id}>{t.tagName}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <select onChange={onSelectList} value={selectedList}>
                        <option>Please Select A  List</option>
                        {lists.map((l) => {
                            return <option key={l.id} value={l.id}>{l.listName}</option>
                        })}
                    </select>
                </fieldset>
                <input type="submit" value="Submit" />
            </form>
        </section>
    </>)
}