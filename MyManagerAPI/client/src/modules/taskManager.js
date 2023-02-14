import { getToken } from "./authManager";

const apiUrl = "/api/Task";

export const getTasksByList = (id) => {
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

export const getTaskById = (id) => {
    return getToken().then((token) => {
        return fetch(`/TaskById/${id}`, {
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

export const addTask = (task) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(task)
        });
    });
};

export const editTask = (note) => {
    return getToken().then((token) => {
        return fetch(apiUrl + `/${note.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(note)
        });
    });
}

export const deleteTask = (id) => {
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

