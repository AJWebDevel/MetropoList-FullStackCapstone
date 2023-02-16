import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentUser } from "../../modules/userManager";
import { AllLists } from "../Lists/allLists";
import { UserList } from "../users/userList";

export default function AdminHome() {
    const [user, setUser] = useState({});
    useEffect(() => {
        currentUser().then(user => setUser(user));
    }, []);

    if (user.userTypeId == 1) {
        return (
            <div className="flex flex-col items-center"
                style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: "30%",
                    marginTop: "-0.5rem",
                    textAlign: "center",
                }}>
                <h3 className="font-metro text-3xl underline text-white mb-6 -mt-10" >What would you like to do?</h3>
                <div className="flex bg-forrest rounded font-techno justify-center border-white w-80 border-2 p-4 mt-2 shadow-md m-10" >
                    <div className="bg-maroon  shadow-2 text-white rounded box-border  border-2 p-2  ">
                        <div className=" bg-liteSoot h-20 w-40 rounded border-white border-2 p-4 m-8"><Link to={"/UserList"}>View All Users</Link></div>
                        <div className="bg-liteSoot h-20 w-40  rounded border-white border-2 p-4 m-8"><Link to={"/AllTags"}>View All Tags</Link></div>
                        <div className="bg-liteSoot h-20 w-40  rounded border-white border-2 p-4 m-8"><Link to={"/AllLists"}>View All Dockets</Link></div>
                    </div>
                </div>


            </div >
        );
    } else {
        return (
            <div style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: "30%",
                marginTop: "-0.5rem",
                textAlign: "center",
            }}
                className="flex flex-col items-center">
                <h3 className="font-metro text-3xl underline text-white mb-6 ">What's on the Docket For Today?'</h3>
                <div className="bg-maroon rounded font-techno justify-center border-white w-80 border-2 p-4 mt-2 shadow-md m-10" >
                    <div className="bg-maroon flex flex-col items-center shadow-2 text-white rounded box-border  border-2 p-2  ">
                        <div className="bg-forrest h-20 w-40  rounded border-white border-2 p-4 m-8"><Link to={`/ListByUser/${user.id}`}>View Dockets</Link></div>
                        <div className="bg-forrest h-20 w-40  rounded border-white border-2 p-4 m-8"><Link to={`/NotesByUser/${user.id}`}>View Notes</Link></div>
                    </div>
                </div>


            </div>
        );
    }


}