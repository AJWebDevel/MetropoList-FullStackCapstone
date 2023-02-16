import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { addList, editList, getListById } from "../../modules/listManager";
import { addListTag } from "../../modules/listTagManager";
import { getAllTags } from "../../modules/tagManager";
import { currentUser } from "../../modules/userManager";

export const CreateListForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [newList, setNewList] = useState({ listName: "", isImportant: false, isPrivate: false });
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



    const addNewList = () => {
        newList.userId = user.id;
        addList(newList)
            .then(resp => {
                if (resp.ok)
                    navigate(`/listByUser/${user.id}`)

            })
    }


    return (<div>
        <h3 className=" text-center text-white  pt-12 font-metro text-3xl underline decoration-double underline-offset-4">Create New To-Do Docket</h3>

        <form onSubmit={(e) => {
            e.preventDefault()

            addNewList()
        }}
            className="bg-forrest shadow-2xl font-techno shadow-md rounded px-8 pt-6 pb-8 mb-4 m-8 border-2 border-white flex flex-col text-white font-techno items-center">



            <fieldset className="m-2 p-2">
                <label className="m-4 text-lg" htmlFor="listName">List Name</label>
                <input className="text-black" name="listName" onChange={changeState} value={newList.listName} />
            </fieldset>
            <fieldset className="m-2 p-2">
                <label className="m-4 text-lg" htmlFor="isImportant">Make List Important?</label>
                <input name="isImportant" type="checkbox" onChange={changeState} />
            </fieldset>
            <fieldset className="m-2 p-2">
                <label className="m-4 text-lg" htmlFor="isPrivate">Make List Private?</label>
                <input name="isPrivate" type="checkbox" onChange={changeState} />
            </fieldset>
            <fieldset className="m-2 p-2">
                <label className="m-4 text-lg" htmlFor="dateCreated">Date Created</label>
                <input className="text-black" name="dateCreated" type="date" onChange={changeState} />
            </fieldset>
            <input className=" p-1 m-4 hover:underline border-white border-2 rounded bg-maroon" type="submit" value="Submit" />
        </form>
    </div>)
}