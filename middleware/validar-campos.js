import { validationResult } from "express-validator";


const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    // sirve para que ejecute el siguiente middleware 
    // sino hay ejecuta el controller
    next();
}

export {
    validarCampos
};
