import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currentUser, getUserById } from "../../modules/userManager";

export const Profile = () => {
    const { id } = useParams();

    const [user, setUser] = useState({});
    useEffect(() => {
        currentUser().then((u) => {
            setUser(u)
        })
    }, []);

    if (user.id == id) {
        return (<div>
            <h3>{user.fullName}</h3>
            <button>Edit Profile</button>
        </div>)

    }
    else {
        return (<div>
            <h3>{user.fullName}</h3>
            <h3>{user.email}</h3>
        </div>)
    }




}
