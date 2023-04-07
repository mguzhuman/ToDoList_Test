const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const checkEmail = (email) => {
    return regEmail.test(email);

}

export const checkEmptyValue = (value) => {
    return value !== '';
}
export const getCookie = (cookieName) => {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

export const setCookie = (name, value) => {
    document.cookie = name + "=" + (value || "") + "; path=/";
}