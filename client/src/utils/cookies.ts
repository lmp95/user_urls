import Cookies from "universal-cookie"

const cookies = new Cookies();

const setCookies = (token: string) => {
    cookies.set('Token', token);
}

const getCookies = (key: string) => {
    return cookies.get(key);
}

const removeCookies = (key: string) => {
    return cookies.remove(key);
}

export const Cookie = {
    getCookies,
    setCookies,
    removeCookies
}