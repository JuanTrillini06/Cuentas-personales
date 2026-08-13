const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    account: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account',
        required: true
    },
    type: {
        type: String,
        enum: ['Entrada', 'Salida'],
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Por favor ingresa un monto']
    },
    currency: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [true, 'Por favor ingresa una descripción']
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }],
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movement', movementSchema);
