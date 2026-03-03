import { Router } from "express";
import { getAllUsers, deleteUser } from "../controller/admin-controller.js";

// Importamos a los guardias uno por uno
import { verifyJWT } from '../The-Huddle--Challenge08--Authentication/middlewares/auth-jwt.js';
import { verifySession } from '../middlewares/auth-session.js';
import { validateCSRF } from '../middlewares/csrf-validator.js';
import { requireRole } from '../middlewares/role-guard.js';

const router = Router();

// Definimos un array con la cadena de guardias que tenemos
const adminSecurity = [verifyJWT, verifySession, validateCSRF, requireRole('admin')];

// Aplicamos los middlewares a nuestras rutas.
router.get('/users', adminSecurity, getAllUsers);
router.delete('/users/:id', adminSecurity, deleteUser)

export default router