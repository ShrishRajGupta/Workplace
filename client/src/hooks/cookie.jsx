import Cookie from 'js-cookie';

const setCookie=(name, usrin)=> {
    Cookie.set(name, usrin, {
        expires: 10,
        secure: true,
        path: '/',
        sameSite: 'strict', 
           
    });
    }
const getCookie=async(name)=>{
    let obj=Cookie.get(name);
    obj= decodeURIComponent(obj);
    const obj1=await JSON.parse(obj);
    return obj1;
}
const removeCookie=(name)=>{
    return Cookie.remove(name);
}

    export {
        setCookie,
        removeCookie,
        getCookie
    }