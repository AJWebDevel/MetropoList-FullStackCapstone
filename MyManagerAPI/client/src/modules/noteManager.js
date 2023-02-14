import { getToken } from "./authManager";



const apiUrl = "/api/Note";

export const getNoteByUser = (id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
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

export const addNote = (note) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(note)
        });
    });
};

export const deleteNote = (id) => {
    return getToken().then((token) => {
        return fetch(apiUrl + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    });
}
