export async function getAsync(endpoint, param) {
    const url = `${endpoint}?${param.key}=${param.value}`;

    // fetch data
    const response = await fetch(url, {
        mode:'cors',
        method: 'GET',
        headers: {
            'x-functions-key':process.env.REACT_APP_X_FUNCTIONS_KEY,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}
