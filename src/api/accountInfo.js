import request from './request';

export default function accountInfo(data) {
    return request({
        path: 'https://warm-citadel-97897.herokuapp.com/api/account/info',
        method: 'GET',
        headers: new Headers({'Authorization': data}),
    });
}
