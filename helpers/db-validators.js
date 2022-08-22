import { Role } from '../models/role.js';
import { User } from '../models/user.js';

const isRoleValid = async (role = '') => {

    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no existe`);
    }
}

const emailExists = async (email = '') => {

    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El email ${email} ya existe`);
    }
}

const userExistsById = async (id = '') => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`El ID ${id} no existe`);
    }
}

export {
    isRoleValid, emailExists, userExistsById
};

