export default function sell(data) {
    return fetch(
        'https://stocks-mocks.herokuapp.com/api/transaction/sell',
        {
            method: 'POST',
            headers: new Headers({ 'Content-Type':  'application/json',
                                        'Authorization': data.accessToken}),
            body:  JSON.stringify({stockId: data.stockId, amount: data.amount})
        })
        .then(r =>{
            return r.json();
        });
}
