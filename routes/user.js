

import { Router } from 'express';
import { check } from 'express-validator';
import {
    deleteUsers,
    getUsers,
    postUsers,
    putUsers
} from '../controllers/user.js';
import { emailExists, isRoleValid, userExistsById } from '../helpers/db-validators.js';
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isRoleValid),
    validarCampos
], putUsers);

router.post('/', [
    check('name', 'nombre obligatorio').notEmpty(),
    check('password', 'password mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es  valido').isEmail(),
    check('email').custom(emailExists),
    // check('role', 'rol no valido').isIn(['ADMIN_ROLE', 'USER_ROL']),
    check('role').custom(isRoleValid),
    validarCampos
], postUsers);
router.delete('/:id', [
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(userExistsById),
    validarCampos
], deleteUsers);

export { router };
