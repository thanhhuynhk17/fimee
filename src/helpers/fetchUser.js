export async function fetchInfo(endpoint, id) {
    const url = `${endpoint}/${id}`;

    // fetch data
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    return data;
}
