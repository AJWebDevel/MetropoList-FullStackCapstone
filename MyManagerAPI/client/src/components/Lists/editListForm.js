import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editList, getListById } from "../../modules/listManager";

export const EditListForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState({});

    useEffect(() => {
        getListById(id).then(setList)
    }, []);

    const changeState = (e) => {

        const copy = { ...list }
        if (e.target.type == "checkbox") {
            copy[e.target.name] = e.target.checked;
        } else {
            copy[e.target.name] = e.target.value
        }
        //iftype is checkbox- use e.target.event
        setList(copy)
    }



    const updateUser = () => {
        editList(list)
            .then(resp => {
                if (resp.ok)
                    navigate(`/singleList/${list.id}`)
            })
    }

    return (<div>
        <form onSubmit={(e) => {
            e.preventDefault()
            updateUser()
        }}>
            <fieldset>
                <label htmlFor="listName">List Name</label>
                <input name="listName" onChange={changeState} value={list.listName} />
            </fieldset>
            <fieldset>
                <label htmlFor="isImportant">Make List Important?</label>
                <input name="isImportant" type="checkbox" onChange={changeState} />
            </fieldset>
            <fieldset>
                <label htmlFor="isPrivate">Make List Private?</label>
                <input name="isPrivate" type="checkbox" onChange={changeState} />
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    </div>)
}