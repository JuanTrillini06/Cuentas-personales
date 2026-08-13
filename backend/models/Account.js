const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Por favor ingresa un nombre para la cuenta'],
        trim: true
    },
    bank: {
        type: String,
        required: [true, 'Por favor ingresa la entidad bancaria']
    },
    currency: {
        type: String,
        required: [true, 'Por favor especifica el tipo de moneda (ej: USD, ARS)']
    },
    initialBalance: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);
