export async function fetchInfo(endpoint, param) {
    const url = `${endpoint}?${param.key}=${param.value}`;

    // fetch data
    const response = await fetch(url, {
        mode:'cors',
        method: 'GET',
        headers: {
            'x-functions-key':process.env.REACT_APP_X_FUNCTIONS_KEY,
            "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept",
            'Access-Control-Allow-Origin':'*'
        },
    });
    const data = await response.json();
    console.log('data', data);
    return data;
}
