export default function signin(data) {
     return fetch(
         'https://warm-citadel-97897.herokuapp.com/api/auth/signin',
         {
         method: 'POST',
         headers: new Headers({ 'Content-Type':  'application/json'}),
         body:  JSON.stringify(data)
     })
         .then(r => r.json());
}
