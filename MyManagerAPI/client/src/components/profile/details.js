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

        return (<div key={profile.id} className="flex mt-8 items-center font-techno flex-col bg-liteSoot p-2 ">

            <img src={profile.profileImageUrl} className="w-1/3 h-1/3 border-black border-8" />
            <h3 className="text-2xl underline p-2 ">{profile.fullName}</h3>
            <p className="m-2 mb-4 text-lg">{profile.email}</p>

            <Link to={`/editProfile/${profile.id}`} className="border-black border-2 rounded p-1 bg-maroon text-white">Edit Profile</Link>
        </div>)

    }
    else {

        return (<div key={profile.id}>
            <h3>{profile.fullName}</h3>
            <h3>{profile.email}</h3>
        </div>)
    }




}
