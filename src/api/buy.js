export default function buy(data) {
    console.log(data);
    return fetch(
        'https://stocks-mocks.herokuapp.com/api/transaction/buy',
        {
            method: 'POST',
            headers: new Headers({ 'Content-Type':  'application/json',
                                        'Authorization': data.accessToken}),
            body:  JSON.stringify({stockId: data.stockId, amount: data.amount})
        })
        .then(r =>{
            console.log(r.status);
            return r.json();
        });
}

