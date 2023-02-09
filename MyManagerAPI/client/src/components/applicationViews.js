import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { currentUser } from "../modules/userManager";
import Login from "./auth/login";
import Register from "./auth/register";
import AdminHome from "./home/adminHome";
import { AllLists } from "./Lists/allLists";
import { ListByUser } from "./Lists/listByUser";
import { NotesByUser } from "./notes/notesByUser";
import { Profile } from "./profile/details";
import { EditUserForm } from "./profile/editProfileform";
import { AllTags } from "./tags/alltags";
import { CreateTagForm } from "./tags/createTagForm";
import { UserList } from "./users/userList";




export default function ApplicationViews({ isLoggedIn }) {
    {
        // const [user, setUser] = useState({});
        // const getUser = () => {
        //     currentUser().then(user => setUser(user));
        // }
        // useEffect(() => {
        //     getUser();
        // }, []);
    }
    return (
        <main>

            <Routes>
                <Route path="/">




                    <Route
                        path="UserList"
                        element={isLoggedIn ? <UserList /> : <Navigate to="/UserList" />}
                    />
                    <Route
                        path="Details/:id"
                        element={isLoggedIn ? <Profile /> : <Navigate to="/Details/:id" />}
                    />
                    <Route
                        path="adminHome"
                        element={isLoggedIn ? <AdminHome /> : <Navigate to="/adminHome" />}
                    />
                    <Route
                        path="allLists"
                        element={isLoggedIn ? <AllLists /> : <Navigate to="/allLists" />}
                    />
                    <Route
                        path="listByUser/:id"
                        element={isLoggedIn ? <ListByUser /> : <Navigate to="/listByUser/:id" />}
                    />
                    <Route
                        path="allTags"
                        element={isLoggedIn ? <AllTags /> : <Navigate to="/allTags" />}
                    />
                    <Route
                        path="createTagForm"
                        element={isLoggedIn ? <CreateTagForm /> : <Navigate to="/createTagForm" />}
                    />
                    <Route
                        path="notesByUser/:id"
                        element={isLoggedIn ? <NotesByUser /> : <Navigate to="/NotesByUser/:id" />}
                    />
                    <Route
                        path="editProfile/:id"
                        element={isLoggedIn ? <EditUserForm /> : <Navigate to="/editProfile/:id" />}
                    />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};
