import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { currentUser } from "../modules/userManager";
import Login from "./auth/login";
import Register from "./auth/register";
import AdminHome from "./home/adminHome";
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
                    {/* <Route
                        path="Details/:id"
                        element={isLoggedIn ? <UserDetails /> : <Navigate to="/Details/:id" />}
                    /> */}
                    <Route
                        path="adminHome"
                        element={isLoggedIn ? <AdminHome /> : <Navigate to="/adminHome" />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};
