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
            <Navbar className='bg-forrest shadow-xl rounded text-white' expand="md">
                <div className='ml-4 pt-2 '>
                    <NavbarBrand className='font-metro text-2xl' tag={RRNavLink} to="/">Metropo-List</NavbarBrand>

                </div>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {isLoggedIn
                        ? user.userTypeId == 1
                            ? (<section className='bg-lite-forrest ' >
                                <Nav className="flex justify-evenly p-1 -mt-2 " navbar>
                                    <NavItem className='ml-5'>
                                        <NavLink className='ml-5' tag={RRNavLink} to="/adminHome">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/Details/${user.id}`}>Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/ListByUser/${user.id}`}>Dockets</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/NotesByUser/${user.id}`}>Notes</NavLink>
                                    </NavItem>
                                    <NavItem className='mr-6'>
                                        <NavLink tag={RRNavLink} to="/" onClick={logout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </section>)
                            : (<section className='bg-lite-forrest '>
                                <Nav className="flex justify-evenly p-1 -mt-2 " navbar>
                                    <NavItem className='ml-5'>
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
                                        <NavLink className='mr-6' tag={RRNavLink} to="/" onClick={logout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </section>)
                        : <section className='bg-lite-forrest'>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={RRNavLink} to="/Register">Register</NavLink>
                            </NavItem>
                        </section>
                    }





                </Collapse>
            </Navbar>
        </div >
    );
}
