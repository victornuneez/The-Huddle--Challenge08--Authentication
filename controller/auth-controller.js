import bcrypt from 'bcrypt';
import { findByUsername, saveUser } from '../models/userRepository.js'
import { SALT_ROUNDS, SECRET_JWT_KEY } from '../config.js';
import { assignSession } from '../utils/session-manager.js';
import jwt from 'jsonwebtoken';
import { generateAccesToken } from '../utils/jwt-helpers.js';


const register = async (req, res) => {
    try {
        // Extraemos los datos que vienen de la peticion (body)
        const { username, email, password, role } = req.body;
        
        // Validamos si el usuario nos envio su username, email y contrasenha
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email y contrasenha requeridos'});
        }

        // Falta validar que el usuario no pueda usar un nombre o email existente.
        const userExist = findByUsername(username);
        if (userExist) {
            return res.status(409).json({ message: 'El nombre de usuario ya en uso'})
        }

        // Hasheamos la contrasenha antes de guardarla
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const registerUser = saveUser({
            username: username,
            email: email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({ 
            message: 'Usuario registrado con exito',
            username: registerUser.username
        });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo errores al realizar el registro, intente de nuevo'})
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validamos que el usuario envio su username y password para loguearse.
        if (!username || !password ) {
            return res.status(400).json({ message: 'Username y contrasenha requeridos'});
        };

        // Buscamos si el username existe en la base de datos(Devuelve el objeto JS completo, no solo el username).
        const userData = findByUsername(username);
        if (!userData) {
            return res.status(401).json({ message: 'Credenciales invalidas 1'});
        };

        // Comparamos las contrasenhas si son correctas
        const compareHash = await bcrypt.compare(password, userData.password)
        if (!compareHash) {
            return res.status(401).json({ message: 'Credenciales invalidas 2'});
        };

        return assignSession(req, res, userData)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor '})
    }
}

const refresh = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Token de refresh no encontrado '});
    }

    try {
        // Verificamos si el token es valido y no ha expirado
        const payload = jwt.verify(refreshToken, SECRET_JWT_KEY);

        if (payload.type !== 'refresh') {
            return res.status(401).json({ message: 'No existe el refresh token '})
        }

        // Usamos los datos del payload directamente para generar el nuevo refreshToken.
        const newAccessToken = generateAccesToken({ _id: payload.id, role: payload.rol, });

        // Devolvemos el nuevo accessToken al usuario
        return res.status(200).json({
            accessToken: newAccessToken,
            exp: '15 min'
        });

    } catch (error) {
        console.error(error);
        return res.status(403).json(({ message: 'Sesion expirada o token invalido' }))
    }

}

const logout = async (req, res) => {

    // Borramos toda la sesion que tiene el usuario en el servidor
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ message: 'Error al cerrar sesion'})
        }
        // Borramos las cookies del navegador de ambas sesiones.
        res.clearCookie('connect.sid'); 
        res.clearCookie('refreshToken');
        
        return res.status(200).json({ message: 'Session cerrada correctamente '});
    
    });
};

export { register, login, refresh, logout }