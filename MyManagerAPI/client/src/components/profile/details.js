import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currentUser, getUserById } from "../../modules/userManager";

export const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});

    useEffect(() => {
        currentUser().then((u) => {
            setUser(u)
        })

    }, []);

    useEffect(() => {

        getUserById(id).then((u) => { setProfile(u) })
    }, []);







    if (user.id == id) {

        return (<div>
            <h3>{profile.fullName}</h3>
            <Link to={`/editProfile/${profile.id}`}>Edit Profile</Link>
        </div>)

    }
    else {

        return (<div>
            <h3>{profile.fullName}</h3>
            <h3>{profile.email}</h3>
        </div>)
    }




}
