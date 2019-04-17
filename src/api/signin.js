export default function signin(data) {
     return fetch(
         'https://stocks-mocks.herokuapp.com/api/auth/signin',
         {
         method: 'POST',
         headers: new Headers({ 'Content-Type':  'application/json'}),
         body:  JSON.stringify(data)
     })
         .then(r =>{
             return r.json();
         });
}
