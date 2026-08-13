const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Por favor ingresa un nombre para la etiqueta'],
        trim: true
    },
    color: {
        type: String,
        default: '#cccccc'
    }
}, {
    timestamps: true
});

// Asegurar que los nombres de las etiquetas sean únicos por usuario
tagSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Tag', tagSchema);
