export default function accountInfo(accessToken) {
    return fetch(
        'https://warm-citadel-97897.herokuapp.com/api/account/info',
        {
            method: 'GET',
            headers: new Headers({'Authorization': accessToken}),
        })
        .then(r => {
            if (r.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    r.status);
                return;
            }
            return r.json();
        });
}
