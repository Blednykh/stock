export default function request(data) {
    return (data.method === 'POST') ?
        fetch(
            data.path,
            {
                method: data.method,
                headers: data.headers,
                body: JSON.stringify(data.body)
            })
            .then(r => {
                return r.json();
            })
        :
        fetch(
            data.path,
            {
                method: data.method,
                headers: data.headers,
            })
            .then(r => {
                // if (r.status !== 200) {
                //             //     console.log('Looks like there was a problem. Status Code: ' +
                //             //         r.status);
                //             //     return;
                //             // }
                return r.json();
            })
}
