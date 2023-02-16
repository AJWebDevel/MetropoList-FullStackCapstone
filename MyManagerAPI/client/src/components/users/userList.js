import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { currentUser, getAllUsers } from "../../modules/userManager";
import User from "./user";


export const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(setUsers)
    }, []);


    return (<section>
        <h2 className="text-2xl font-metro text-center mt-10 underline text-white">All Metropo-List Users</h2>
        {
            users.map((u) => (
                <div className="font-techno text-center border-white border-2 m-8 p-6 bg-forrest shadow-xl rounded">
                    <User key={u.id} user={u} />
                    <Link to={`/Details/${u.id}`} className=" p-1 hover:underline border-black border-2 rounded bg-maroon">Details</Link>

                </div>
            ))
        }
    </section>)
}