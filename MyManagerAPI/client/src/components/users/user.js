import React from "react";
import { Card, CardBody } from "reactstrap";

export default function User({ user }) {

    return (
        <Card className="m-4">
            <CardBody>

                <h3>{user.fullName}</h3>
                <p>{user.email}</p>
                < p > {user.userType.name}</p>
                <button>View Profile</button>
            </CardBody>
        </Card>
    );
}
