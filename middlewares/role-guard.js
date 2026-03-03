/*
Middleware que verifica que rol tiene el usuario para proteger rutas segun el rol del usuario.
*/

const requireRole = (necessaryRole) => {
    return (req, res, next) => {

        // Verificamos quien esta realizando la peticion.(autenticacion -> quien sos) 
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no identificado'});
        }

        // Verificamos el rol del usuario.(autorizacion -> que podes hacer)
        if (req.user.role !== necessaryRole) {
            return res.status(403).json({ message: 'Acceso denegado. No tienes permisos'});
        }

        next();
    };
};

export { requireRole }