import request from './request';

export default function sell(data, accessToken) {
    return request({
        path: 'https://warm-citadel-97897.herokuapp.com/api/transaction/sell',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }),
        body: data
    });
}

