import React, { useEffect, useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';
import { currentUser } from '../modules/userManager';
import AdminHome from './home/adminHome';
import { NotesByUser } from './notes/notesByUser';

//import { UserList } from './UserList';


export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        if (isLoggedIn) {
            currentUser().then((u) => {
                setUser(u)
            })
        }
    }, [isLoggedIn]);


    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">MyManager</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {isLoggedIn
                        ? user.userTypeId == 1
                            ? (<>
                                <Nav className="mr-auto " navbar>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/adminHome">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/Details/${user.id}`}>Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/ListByUser/${user.id}`}>My Lists</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/NotesByUser/${user.id}`}>My Notes</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/" onClick={logout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </>)
                            : (<>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/adminHome">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/Details/${user.id}`}>Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/ListByUser/${user.id}`}>My Lists</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/NotesByUser/${user.id}`}>My Notes</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/" onClick={logout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </>)
                        : <>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={RRNavLink} to="/Register">Register</NavLink>
                            </NavItem>
                        </>
                    }





                </Collapse>
            </Navbar>
        </div >
    );
}
