import { Category, Product, Role, User } from '../models/index.js';

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
        throw new Error(`El usuario con ID ${id} no existe`);
    }
}

const categoryExistsById = async (id = '') => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`La categoría con ID ${id} no existe`);
    }
}

const productExistsById = async (id = '') => {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error(`El producto con ID ${id} no existe`);
    }
}

const validateCollection = async (collection = '', collections = []) => {

    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`La colección ${collection} no permitida - ${collections}`);
    }
    return true;
}

export {
    isRoleValid,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById,
    validateCollection
};

