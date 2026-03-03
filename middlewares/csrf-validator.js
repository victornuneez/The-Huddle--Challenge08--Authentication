/*
Verifica si la peticion realmente viene desde la aplicacion y no desde otra pagina maliciosa.
*/

const validateCSRF =(req, res, next) => {

    // Si el usuario se logueo por JWT, no es necesario validar CSRF, entonces lo dejamos pasar(JWT no es vulnerable a CSRF).
    if (req.authMethod === 'jwt') return next();

    // Obtenemos el csrfToken de la session(servidor) y el tokenCsrf que envia el navegador(user) en el header.
    // (?. devuelve undefined en vez de romper el codigo)
    const sessionToken = req.session?.csrfToken;
    const headerToken = req.headers['x-csrf-token']; 

    // Verificamos si los CSRF TOKEN existen y si son distintos, esto evita que sitios maliciosos hagan acciones usando solo las cookies.
    if (!sessionToken || !headerToken || sessionToken !== headerToken) {
        return res.status(403).json({ message: 'Token CSRF invalido o faltante' })
    }

    next()
};

export { validateCSRF }
