export default function accountInfo(accessToken) {
    console.log(accessToken);
    return fetch(
        'https://stocks-mocks.herokuapp.com/api/account/info',
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
            console.log(r.status);
            return r.json();
        });
}
