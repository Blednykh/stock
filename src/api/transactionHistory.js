import request from "./request";

export default function transactionHistory(data) {
    return request({
        path: `https://warm-citadel-97897.herokuapp.com/api/transaction/history?search=${
            data.search
            }&count=${data.count}&itemId=${data.itemId}`,
        method: "GET",
        headers: new Headers({ Authorization: data.accessToken })
    });
}
