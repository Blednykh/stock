import request from './request';

export default function signin(data) {
    return request({
        path: 'https://warm-citadel-97897.herokuapp.com/api/auth/signin',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: data
    });
}
