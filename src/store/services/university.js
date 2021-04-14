import authHeader from "../../helpers/auth-header";

const handleResponse = response => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

const getRequestOptions = data => ({
    method: "GET",
    headers: authHeader(),
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

const getData = data => {
    return fetch('/users/universities', getRequestOptions(data)).then(handleResponse);
};

export const universityService  = {
    getData
};