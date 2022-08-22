import bcrypt from 'bcryptjs';
import { request, response } from 'express';
import { generateJWT } from '../helpers/jwt.js';
import { User } from '../models/user.js';

const login = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        // verificar si el user existe
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // si está activo
        if (!user.state) {
            return res.status(400).json({ msg: 'User deleted' });
        }

        //validar contraseña
        const validPwd = bcrypt.compareSync(password, user.password);
        if (!validPwd) {
            return res.status(400).json({ msg: 'password invalid' });
        }

        // generar JWT
        const token = await generateJWT(user.id);

        res.json({ user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'algo salió mal'
        })
    }

}

export {
    login
};

