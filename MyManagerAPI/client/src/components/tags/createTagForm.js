import { useState } from "react"

import { useNavigate } from "react-router-dom";
import { addTag } from "../../modules/tagManager";

export const CreateTagForm = () => {
    const [newTag, setNewTag] = useState({ name: "" }),
        navigate = useNavigate()

    const changeState = (e) => {
        const copy = { ...newTag }
        copy[e.target.name] = e.target.value

        setNewTag(copy)
    }

    const addNewTag = () => {
        addTag(newTag)
            .then(res => {
                if (res.ok)
                    navigate("/allTags")
            })
    }


    return (
        <>
            <div>
                <h3 className=" text-center text-white  pt-12 font-metro text-3xl underline decoration-double underline-offset-4">Add a New Tag</h3>
                <form className="bg-forrest shadow-2xl font-techno shadow-md rounded px-8 pt-6 pb-8 mb-4 m-8 border-2 border-white flex flex-col text-white font-techno items-center">
                    <fieldset className="mb-6">
                        <div className="text-lg pb-2"><label htmlFor="tagName">Tag Name</label></div>
                        <div className="text-black"><input name="tagName" onChange={changeState} value={newTag.TagName} /></div>
                    </fieldset>
                    <button type="button" onClick={() => addNewTag()}
                        className=" p-1 hover:underline border-black border-2 rounded bg-maroon">Save</button>
                </form>
            </div>
        </>
    )
}