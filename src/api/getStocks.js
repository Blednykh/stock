export default function getStocks(data) {
    return fetch(
        `https://stocks-mocks.herokuapp.com/api/stocks`,
        {
            method: 'GET',
            headers: new Headers({'Authorization': data.accessToken}),
        })
        .then(r => {
            if (r.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    r.status);
                return;
            }
            console.log(r.status);
            return r.json();
        });
}
