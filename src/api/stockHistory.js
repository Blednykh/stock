export default function stockHistory(data) {
    return fetch(
        'https://stocks-mocks.herokuapp.com/api/stocks/'+data.id+'/history',
        {
            method: 'GET',
            headers: new Headers({'Authorization': data.accessToken}),
        })
        .then(r => r.json());
}
