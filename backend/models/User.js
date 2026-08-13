const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Por favor ingresa un nombre'],
    },
    lastName: {
        type: String,
        required: [true, 'Por favor ingresa un apellido'],
    },
    email: {
        type: String,
        required: [true, 'Por favor ingresa un email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor ingresa un email válido'
        ]
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa una contraseña'],
        minlength: 6,
        select: false
    },
    timezone: {
        type: String,
        default: 'UTC'
    }
}, {
    timestamps: true
});

// Encriptar password usando bcrypt
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comprobar contraseña
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
