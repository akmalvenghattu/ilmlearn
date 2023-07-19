const key = "ilm";

const storeUser = async (userData) => {
    try {
        await localStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {
        console.log("Error storing the user data", error);
        return null;
    }
};

export const getUser = async () => {
    try {
        const storedUser = await localStorage.getItem(key);
        return ((storedUser) ? JSON.parse(storedUser) : null);
    } catch (error) {
        console.log("Error getting the auth token", error);
        return null;
    }
};

export const storeData = (key, value) => {
    try {
        //alert("x-auth-token storage storeData"+key+" "+value);
        const jsonValue = JSON.stringify(value)
        localStorage.setItem(key, jsonValue)
    } catch (e) {
    }
}

export const getData = (key) => {
    try {
        const jsonValue = localStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
}


export const removeData = (key) => {
    try {
        localStorage.removeItem(key)
    } catch (e) {
    }
}

export default { storeUser, getUser, storeData, getData, removeData };