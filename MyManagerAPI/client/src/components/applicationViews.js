import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { currentUser } from "../modules/userManager";
import Login from "./auth/login";

import Register from "./auth/register";
import AdminHome from "./home/adminHome";
import UserHome from "./home/userHome";
import { AllLists } from "./Lists/allLists";
import { CreateListForm } from "./Lists/createListForm";
import { EditListForm } from "./Lists/editListForm";
import { ListByUser } from "./Lists/listByUser";
import { SingleList } from "./Lists/singleList";
import { CreateNoteForm } from "./notes/createNoteForm";
import { NotesByUser } from "./notes/notesByUser";
import { Profile } from "./profile/details";
import { EditUserForm } from "./profile/editProfileform";
import { AllTags } from "./tags/alltags";
import { CreateTagForm } from "./tags/createTagForm";
import { CreateTaskForm } from "./tasks/createTaskForm";
import { EditTaskForm } from "./tasks/editTaskForm";
import { UserList } from "./users/userList";




export default function ApplicationViews({ isLoggedIn }) {

    const [user, setUser] = useState({});

    useEffect(() => {

        if (isLoggedIn) {
            currentUser().then(user => setUser(user));
        }
    }, []);

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
                        path="createNoteForm"
                        element={isLoggedIn ? <CreateNoteForm /> : <Navigate to="/createNoteForm" />}
                    />
                    <Route
                        path="notesByUser/:id"
                        element={isLoggedIn ? <NotesByUser /> : <Navigate to="/NotesByUser/:id" />}
                    />
                    <Route
                        path="editProfile/:id"
                        element={isLoggedIn ? <EditUserForm /> : <Navigate to="/editProfile/:id" />}
                    />
                    <Route
                        path="singleList/:id"
                        element={isLoggedIn ? <SingleList /> : <Navigate to="/singleList/:id" />}
                    />
                    <Route
                        path="editListForm/:id"
                        element={isLoggedIn ? <EditListForm /> : <Navigate to="/editListForm/:id" />}
                    />

                    <Route
                        path="createListForm"
                        element={isLoggedIn ? <CreateListForm /> : <Navigate to="/createListForm" />}
                    />

                    <Route
                        path="createTaskForm"
                        element={isLoggedIn ? <CreateTaskForm /> : <Navigate to="/createTaskForm" />}
                    />
                    <Route
                        path="editTaskForm/:id"
                        element={isLoggedIn ? <EditTaskForm /> : <Navigate to="/editTaskForm/:id" />}
                    />

                </Route>
                <Route path="/Home" element={<AdminHome />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Routes>
        </main >
    );
};
