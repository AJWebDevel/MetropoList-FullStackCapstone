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
        <h2>All MyManager Users</h2>
        {
            users.map((u) => (
                <div>
                    <User key={u.id} user={u} />
                    <Link to={`/Details/${u.id}`}>Details</Link>

                </div>
            ))
        }
    </section>)
}