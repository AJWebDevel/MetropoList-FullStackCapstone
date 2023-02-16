import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserById } from "../../modules/userManager";
import { ListByUser } from "../Lists/listByUser";

export const EditUserForm = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState({ email: "", firstName: "", lastName: "", profileImageUrl: "" });
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
        <h5 className="font-metro text-center text-white pt-4 text-3xl underline decoration-double underline-offset-4">Edit Profile</h5>
        <form
            onSubmit={(e) => {
                e.preventDefault()

                updateUser()

            }}
            className="shadow-md rounded bg-forrest px-8 pt-6 pb-8 mb-4 m-8 border-2 border-white flex flex-col text-white font-techno items-center">
            <div className="p-4 text-lg">
                <fieldset className="p-4 ">
                    <label htmlFor="email" className="m-4">Email</label>
                    <input className="text-black w-fit rounded" name="email" onChange={changeState} value={user.email} />
                </fieldset>
                <fieldset className="p-4">
                    <label htmlFor="firstName" className="m-2">First Name</label>
                    <input className="text-black w-fit rounded" name="firstName" onChange={changeState} value={user.firstName} />
                </fieldset>
                <fieldset className="p-4 ">
                    <label htmlFor="lastName" className="m-2">Last Name</label>
                    <input className="text-black rounded" name="lastName" onChange={changeState} value={user.lastName} />
                </fieldset>
                <fieldset className="p-4">
                    <label htmlFor="profileImageUrl" className="m-2">Profile Picture</label>
                    <input className="text-black w-full rounded" name="profileImageUrl" onChange={changeState} value={user.profileImageUrl} />
                </fieldset>
            </div>

            <input type="submit" value="Submit" className=" p-1 m-4 hover:underline border-white border-2 rounded bg-maroon" />
        </form>
    </div>)
}