export default function transactionHistory(data) {
    return fetch(
        `https://stocks-mocks.herokuapp.com/api/transaction/history`,
        {
            method: 'GET',
            headers: new Headers({'Authorization': data.accessToken}),
        })
        .then(r => r.json());
}
