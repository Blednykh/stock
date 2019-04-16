export default function signin(data) {
     return fetch(
         'https://stocks-mocks.herokuapp.com/api/auth/signin',
         {
         method: 'POST',
         headers: new Headers({ 'Content-Type':  'application/json'}),
         body:  JSON.stringify(data)
     })
         .then(r =>{
             // if (r.status !== 200) {
             //     console.log('Looks like there was a problem. Status Code: ' +
             //         r.status);
             //     return;
             // }
             return r.json();
         });
}
