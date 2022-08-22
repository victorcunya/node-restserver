

import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.js';
import { validarCampos } from '../middleware/validar-campos.js';

const authRouter = Router();

authRouter.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').notEmpty(),
    validarCampos,
], login);

export { authRouter };

