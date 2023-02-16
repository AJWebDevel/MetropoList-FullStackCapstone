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

        return (<div className="flex flex-col items-center">
            <div key={profile.id} className="border-2 border-white flex mt-8 items-center rounded font-techno flex-col bg-forrest w-1/2  p-6 text-white p-2 ">

                <img src={profile.profileImageUrl} className="w-1/3 h-1/3 border-black border-8" />
                <h3 className="text-2xl underline p-2 ">{profile.fullName}</h3>
                <p className="m-2 mb-4 text-lg">{profile.email}</p>

                <Link to={`/editProfile/${profile.id}`} >Edit Profile</Link>
            </div>
        </div>)

    }
    else {

        return (<div className="flex flex-col items-center">
            <div key={profile.id} className="border-2 border-white flex mt-8 items-center rounded font-techno flex-col bg-forrest w-1/2  p-6 text-white p-2 ">
                <img src={profile.profileImageUrl} className="w-1/3 h-1/3 border-black border-8" />
                <h3 className="text-2xl underline p-2 ">{profile.fullName}</h3>
                <h3 className="m-2 mb-4 text-lg">{profile.email}</h3>
            </div>
        </div>)
    }




}
