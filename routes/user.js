

import { Router } from 'express';
import { deleteUsers, getUsers, postUsers, putUsers } from '../controllers/user.js';

const router = Router();

router.get('/', getUsers);
router.put('/:id', putUsers);
router.post('/', postUsers);
router.delete('/', deleteUsers);

export { router };
