const endpoint = import.meta.env.VITE_SERVER_API_URL;

async function request(user, url, method) {
    try {
        const token = await user.getIdToken();
        const config = {method: method, headers: {Authorization: `Bearer ${token}`}};

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            return {response, data};
        }
        catch(error) {
            console.error("Error en una petición a la API", error);
        }
    }
    catch(error) {
        console.error("Error obteniendo un token de usuario", error);
    }

    return null;
}

async function getAll(user) {
    return await request(user, endpoint + "/chore", "GET");
}

async function addCompletedDay(user, id, date) {
    return await request(user, endpoint + "/chore/" + id + "/completedDays/" + date.toISOString(), "POST");
}

async function removeCompletedDay(user, id, date) {
    return await request(user, endpoint + "/chore/" + id + "/completedDays/" + date.toISOString(), "DELETE");
}

export {getAll, addCompletedDay, removeCompletedDay};