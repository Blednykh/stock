import request from './request';

export default function refresh(data) {
    return request({
        path: 'https://warm-citadel-97897.herokuapp.com/api/auth/refresh',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: data
    });
}
