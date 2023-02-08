import { useEffect, useState } from "react"
import { getAllTags } from "../../modules/tagManager";

export const Alltags = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllTags().then(setTags)
    }, []);

    return (<section>
        <h2>All Tags</h2>
        {
            tags.map((t) => (
                <div>
                    <p>{t.tagName}</p>
                </div>
            ))
        }
    </section>
    )
}