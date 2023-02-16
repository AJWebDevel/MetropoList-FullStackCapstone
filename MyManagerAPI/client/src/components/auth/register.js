import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";



export default function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    let [userTypeId, setUserTypeId] = useState(2);
    const [email, setEmail] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                firstName,
                lastName,
                profileImageUrl,
                email,
                userTypeId,
            };


            register(userProfile, password)
            navigate("/Home");
        }
    };

    return (<section className="flex flex-col items-center p-2">
        <h3 className="text-2xl text-center font-metro text-3xl underline text-white mb-6 mt-6 ">Register for Metropo-List</h3>

        <Form onSubmit={registerClick} className="text-white">
            <fieldset>
                <FormGroup className="p-2">
                    <Label className="text-lg m-4 p-2" htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label className="text-lg m-4 p-2" htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label className="text-lg m-4 p-2" for="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label className="text-lg m-4 p-2" htmlFor="profileImageUrl">Profile Image URL</Label>
                    <Input
                        id="profileImageUrl"
                        type="text"
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label className="text-lg m-4 p-2" for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label className="text-lg m-4 p-2" for="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="flex flex-col m-2 mt-6 border-2 bg-maroon hover:underline">
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    </section>

    );
}
