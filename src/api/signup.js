export default function signup(data) {
    return fetch(
        /*warm-citadel-97897.herokuapp.com*/
        /*stocks-mocks.herokuapp.com*/
        'https://warm-citadel-97897.herokuapp.com/api/auth/signup',
        {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        })
        .then(r => {
            // if (r.status !== 200) {
            //             //     console.log('Looks like there was a problem. Status Code: ' +
            //             //         r.status);
            //             //     return;
            //             // }
            return r.json();
        });
}
