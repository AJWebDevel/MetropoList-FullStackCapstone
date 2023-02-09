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
                <h3>Add a New Tag</h3>
                <form>
                    <fieldset>
                        <div><label htmlFor="tagName">Tag Name</label></div>
                        <div><input name="tagName" onChange={changeState} value={newTag.TagName} /></div>
                    </fieldset>
                    <button type="button" onClick={() => addNewTag()}>Save</button>
                </form>
            </div>
        </>
    )
}