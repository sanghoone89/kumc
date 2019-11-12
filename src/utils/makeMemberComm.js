export function makeMember(username, nickname, phonenumber, position) {
    const requestParam = {
        "username": username,
        "nickname": nickname,
        "phonenumber": phonenumber,
        "position": position
    }

    return requestParam;
}