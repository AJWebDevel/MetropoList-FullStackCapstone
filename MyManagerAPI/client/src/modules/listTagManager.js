import { getToken } from "./authManager";

const apiUrl = "api/ListTag"

export const getListTagsByListId = (id) => {
    return getToken().then((token) =>
        fetch(`/ListTagsByList/${id}`, {
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

export const addListTag = (listTag) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(listTag)
        });
    });
};

export const deleteListTag = (id) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    });
};