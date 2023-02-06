import { getToken } from "./authManager";

const apiUrl = "/api/UserProfile";

export const getAllUsers = () => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "Unknown Error occured when trying to fetch users",
                );
            }
        });
    });
};

export const currentUser = () => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/CurrentUser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.ok));
};

export const getUserById = (id) => {
    return getToken().then((token) => {
        return fetch(`/Details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An error has occured while trying to fetch this user."
                );
            }
        });
    });
};


