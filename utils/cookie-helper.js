
// Funcion para realizar(setear) una cookie con estas reglas de seguridad.
const setSecureCookie = (res, name, value) => {
    res.cookie(name, value, {                           // "res.cookie" envia una cabecera Set-Cookie
        httpOnly: true,                                 // El JS del navegador no puede leer la cookie, no se puede robar la cookie facilmente
        sameSite: 'lax',                                // Controla cuando el navegador envia la cookie automaticamente al servidor. Permite enlaces externos GET y protege contra mayoria de CSRF
        maxAge: 7 * 24 * 60 * 1000,
        path: '/'                                       // '/' significa que se puede usar en toda la aplicacion.
    });
};

export { setSecureCookie }