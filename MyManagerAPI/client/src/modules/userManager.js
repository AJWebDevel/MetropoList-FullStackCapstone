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
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An error has occured while trying to fetch this user."
                );
            }
        }));
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

export const addUser = (user) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
    });
};

export const editUser = (user) => {
    return getToken().then((token) => {
        return fetch(apiUrl + `/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
    });
};


