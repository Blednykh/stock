export default function refresh(data) {
    return fetch(
        'https://stocks-mocks.herokuapp.com/api/auth/refresh',
        {
            method: 'POST',
            headers: new Headers({ 'Content-Type':  'application/json'}),
            body:  JSON.stringify(data)
        })
        .then(r =>{
            return r.json();
        });
}
