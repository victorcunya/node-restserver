
import { Router } from 'express';
import { check } from 'express-validator';
import { showImage, updateFile, uploadFile } from '../controllers/upload.js';
import { validateCollection } from '../helpers/db-validators.js';
import { validarCampos, validateFile } from '../middleware/index.js';

const uploadRouter = Router();

uploadRouter.post('/', [
    validateFile
], uploadFile);

uploadRouter.put('/:collection/:id', [
    validateFile,
    check('id', 'Mongo ID no valido').isMongoId(),
    check('collection')
        .custom(col => validateCollection(col, ['users', 'products'])),
    validarCampos
], updateFile);

uploadRouter.get('/:collection/:id', [
    check('id', 'Mongo ID no valido').isMongoId(),
    check('collection')
        .custom(col => validateCollection(col, ['users', 'products'])),
    validarCampos
], showImage);

export { uploadRouter };

