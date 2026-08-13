const Tag = require('../models/Tag');

// @desc    Obtener etiquetas del usuario
// @route   GET /api/tags
// @access  Private
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({ user: req.user.id });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear una etiqueta
// @route   POST /api/tags
// @access  Private
const createTag = async (req, res) => {
    const { name, color } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Por favor ingresa un nombre para la etiqueta' });
    }

    try {
        const tag = await Tag.create({
            name,
            color: color || '#cccccc',
            user: req.user.id
        });
        res.status(201).json(tag);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Ya existe una etiqueta con ese nombre' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Actualizar etiqueta
// @route   PUT /api/tags/:id
// @access  Private
const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);

        if (!tag) {
            return res.status(404).json({ message: 'Etiqueta no encontrada' });
        }

        if (tag.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Eliminar etiqueta
// @route   DELETE /api/tags/:id
// @access  Private
const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);

        if (!tag) {
            return res.status(404).json({ message: 'Etiqueta no encontrada' });
        }

        if (tag.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        await tag.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTags,
    createTag,
    updateTag,
    deleteTag
};
