import { getToken } from "./authManager";

const apiUrl = "/api/List";

export const getAllLists = () => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else {
                throw new Error("Unknown error has occured.");
            }
        });
    });
};

export const getListsByUser = (id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else {
                throw new Error("An unknown error as occured.");
            }
        });
    });
};

export const getListById = (id) => {
    return getToken().then((token) => {
        return fetch(`/ListDetails/${id}`, {
            method: "GET", headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else {
                throw new Error("An unknown error as occured.");
            }
        })
    });
};

export const editList = (list) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${list.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(list)
        });
    });
};

export const addList = (list) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(list)
        });
    });
};