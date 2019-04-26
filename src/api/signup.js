import request from './request';

export default function signup(data) {
    return request({
        path: 'https://warm-citadel-97897.herokuapp.com/api/auth/signup',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: data
    });
}


