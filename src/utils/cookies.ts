
import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, time: number) => {
    let expires = "";
    if (time) {
        const date = new Date();
        date.setTime(date.getTime() + time * 60 * 1000);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expires = "; expires=" + date.toUTCString();
    }
    Cookies.set(name, value, { expires: time, path: '/', secure: true, sameSite: 'strict' });
};

export const getCookie = (name: string) => {
    const cookieValue = Cookies.get(name);
    return cookieValue;
}


export const deleteCookie = (nombre: string) => {
  Cookies.remove(nombre, { path: '/', secure: true, sameSite: 'strict' });
};
