import request from './request';

export default function buy(data, accessToken) {
    return request({
        path: 'https://warm-citadel-97897.herokuapp.com/api/transaction/buy',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }),
        body: data
    });
}


