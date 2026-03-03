/*
Este middleware identifica al usuario y valida que el token que tiene sea valido.
Permite que las rutas sepan quien esta logueado sin tener que decodificar el JWT cada vez.
Evita que gente que modifique o robe un token pueda entrar
*/

import { SECRET_JWT_KEY } from "../config.js";
import jwt from 'jsonwebtoken'

const verifyJWT = (req, res, next) => {
    const auth = req.headers.authorization;

    // Verificamos si trae un JWT en el Bearer, si no trae token, pasamos al sig middleware (quizas es una sesion con cookies)
    if (!auth || !auth.startsWith('Bearer ')) {
        return next();
    }

    // Extraemos solo el token sin el Bearer (cortamos el bearer y eliminamos espacios extra)
    const token = auth.slice('Bearer '.length).trim();

    try {
        // verificamos si el token es valido(si nadie lo modifico) o no expiro. 
        // Guardamos el payload en la request para identificar al usuario logueado. Indicamos con que metodo ingreso
        // Sin esto el backend no sabe quien hace la request y tendria que verificar el JWT cada vez.
        const payload = jwt.verify(token, SECRET_JWT_KEY);
        req.user = payload; // 
        req.authMethod = 'jwt';

        next();

    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Token invalido o expirado '})
    }
}

export { verifyJWT }