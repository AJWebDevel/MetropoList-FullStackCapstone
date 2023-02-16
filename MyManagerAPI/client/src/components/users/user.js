import React from "react";
import { Card, CardBody } from "reactstrap";

export default function User({ user }) {

    return (
        <Card className="m-4">
            <CardBody>
                <div className="flex flex-col text-white items-center rounded bg-maroon border-white border-2">
                    <h3 className="text-xl">{user.fullName}</h3>
                    <img src={user.profileImageUrl} className="w-1/3 h-1/3 border-black border-8" />
                    <p>{user.email}</p>
                    < p > {user.userType.name}</p>

                </div>

            </CardBody>
        </Card>
    );
}
