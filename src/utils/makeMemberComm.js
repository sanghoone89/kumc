export function makeMember(username, nickname, email, position) {
    const requestParam = {
        "username": username,
        "nickname": nickname,
        "email": email,
        "position": position
    }

    return requestParam;
}