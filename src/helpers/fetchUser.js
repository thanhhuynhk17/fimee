export async function fetchInfo(endpoint, id) {
    const url = `${endpoint}/${id}`;

    // fetch data
    const response = await fetch(url, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
