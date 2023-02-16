import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../modules/authManager";


export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/Home"))
            .catch(() => alert("Invalid email or password"));
    };

    return (<section className="flex flex-col items-center p-2">
        <h3 className="text-2xl text-center font-metro text-3xl underline text-white mb-6 mt-6 ">Please Login</h3>
        <Form onSubmit={loginSubmit}
            className="text-white font-techno">
            <fieldset>
                <FormGroup className="p-4">
                    <Label className="text-lg m-4 p-2" for="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label className="m-4 p-2 text-lg" for="password">Password</Label>
                    <Input className="text-black"
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <div className="flex flex-col items-center">
                    <FormGroup className="pt-4">
                        <Button className="hover:underline bg-maroon p-2 border-2 rounded">Login</Button>
                    </FormGroup>

                    <em className="hover:underline p-2">
                        Not registered? <Link to="register">Sign Up Here</Link>
                    </em>
                </div>

            </fieldset>
        </Form>
    </section >

    );
}