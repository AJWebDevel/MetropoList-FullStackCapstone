import { getToken } from "./authManager"

const apiUrl = "api/Tag"

export const getAllTags = () => {
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

export const addTag = (tag) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(tag)
        });
    });
};

export const deleteTag = (id) => {
    return getToken().then((token) => {
        return fetch(apiUrl + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        }).then((resp) => resp.json())
    });
};