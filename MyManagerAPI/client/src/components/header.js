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

//import { UserList } from './UserList';


export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        currentUser().then((u) => {
            setUser(u)
        })
    }, []);


    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">MyManager</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>

                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/adminHome">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={`/Details/${user.id}`}>Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={`/ListByUser`}>My Lists</NavLink>
                                </NavItem>



                            </>
                        }
                    </Nav>

                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/" onClick={logout}>Logout</NavLink>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
