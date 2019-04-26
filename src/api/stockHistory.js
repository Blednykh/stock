import request from './request';

export default function stockHistory(data, accessToken) {
    return request({
        path: `https://warm-citadel-97897.herokuapp.com/api/stocks/${data.id}/history?range=${data.range}`,
        method: 'GET',
        headers: new Headers({'Authorization': accessToken}),
    });
}

