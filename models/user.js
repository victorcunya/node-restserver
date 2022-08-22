import pkg from 'mongoose';
const { model, Schema } = pkg;

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    email: {
        type: String,
        required: [true, 'email requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password requerido']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function () {
    const { __v, password, ...User } = this.toObject();
    return User
}

const User = model('User', userSchema)

export {
    User
};
