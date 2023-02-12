import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserById } from "../../modules/userManager";
import { ListByUser } from "../Lists/listByUser";

export const EditUserForm = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserById(id).then(setUser)
    }, []);

    const changeState = (e) => {

        const copy = { ...user }
        copy[e.target.name] = e.target.value

        setUser(copy)
    }

    const updateUser = () => {
        editUser(user)
            .then(resp => {
                if (resp.ok)
                    navigate(`/Details/${user.id}`)
            })
    }
    return (<div>
        <form onSubmit={(e) => {
            e.preventDefault()

            updateUser()
        }}>

            <fieldset>
                <label htmlFor="email">Email</label>
                <input name="email" onChange={changeState} value={user.email} />
            </fieldset>
            <fieldset>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" onChange={changeState} value={user.firstName} />
            </fieldset>
            <fieldset>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" onChange={changeState} value={user.lastName} />
            </fieldset>
            <fieldset>
                <label htmlFor="profileImageUrl">Profile Picture</label>
                <input name="profileImageUrl" onChange={changeState} value={user.profileImageUrl} />
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    </div>)
}