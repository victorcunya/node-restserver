
import { Router } from 'express';
// import { check } from 'express-validator';
import { uploadFile } from '../controllers/upload.js';
// import { validarCampos } from '../middleware/index.js';

const uploadRouter = Router();

uploadRouter.post('/', [

], uploadFile);

export { uploadRouter };

