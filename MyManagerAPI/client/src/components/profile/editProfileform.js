import { useState } from "react"
import { ListByUser } from "../Lists/listByUser";

const DetailsForm = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        ListByUser().then(setUser)
    }, []);

    const changeState = (e) => {
        const copy = { ...user }
        copy[e.target.name] = e.target.value

        setUser(copy)
    }

    return (<form>

    </form>)
}