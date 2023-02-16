import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editList, getListById } from "../../modules/listManager";

export const EditListForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState({ listName: "", isImportant: false, isPrivate: false });

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
        <h4 className=" text-center text-white  pt-12 font-metro text-3xl underline decoration-double underline-offset-4"> Edit List</h4>
        <form onSubmit={(e) => {
            e.preventDefault()
            updateUser()
        }}
            className="bg-forrest shadow-2xl font-techno shadow-md rounded px-8 pt-6 pb-8 mb-4 m-8 border-2 border-white flex flex-col text-white font-techno items-center">

            <fieldset className="m-2 p-2">
                <label className="m-4 text-lg" htmlFor="listName">List Name</label>
                <input className="text-black" name="listName" onChange={changeState} value={list.listName} />
            </fieldset>
            <fieldset className="m-2 p-2">
                <label className="m-4 text-lg" htmlFor="isImportant">Make List Important?</label>
                <input name="isImportant" type="checkbox" onChange={changeState} value={list.isImportant} />
            </fieldset>
            <fieldset className="m-2 p-2">
                <label className="m-4 text-lg" htmlFor="isPrivate">Make List Private?</label>
                <input name="isPrivate" type="checkbox" onChange={changeState} value={list.isPrivate} />
            </fieldset>
            <input type="submit" value="Submit" className=" p-1 m-4 hover:underline border-white border-2 rounded bg-maroon" />
        </form>
    </div>)
}