import request from './request';

export default function getStocks(data) {
    return request({
        path: `https://warm-citadel-97897.herokuapp.com/api/stocks?search=${data.search}&count=${data.count}&itemId=${data.itemId}`,
        method: 'GET',
        headers: new Headers({'Authorization': data.accessToken}),
    });
}

