
function post(endpoint, data) {
    Results.res = true;
    Results.loading = true;
    Results.connections = '';

    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        });
}
