import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AllLists } from "../Lists/allLists";
import { UserList } from "../users/userList";

export default function AdminHome() {

    return (
        <div style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: "50%",
            marginTop: "-0.5rem",
            textAlign: "center",
        }}>
            <h3>What would you like to do?</h3>
            <div style={{}}><Link to={"/UserList"}>View All Users</Link></div>
            <div><Link to={"/AllLists"}>View All Tags</Link></div>
            <div><Link to={"/AllLists"}>View All Lists</Link></div>

        </div>
    );
}