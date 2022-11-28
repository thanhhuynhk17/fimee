export async function fetchInfo(endpoint, id) {
    const url = `${endpoint}/${id}`;

    // fetch data
    const response = await fetch(url, {
        mode:'cors',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
    });
    const data = await response.json();
    return data;
}
