const Movement = require('../models/Movement');
const Account = require('../models/Account');

// @desc    Obtener movimientos del usuario
// @route   GET /api/movements
// @access  Private
const getMovements = async (req, res) => {
    try {
        const movements = await Movement.find({ user: req.user.id })
                                        .populate('account', 'name bank currency')
                                        .populate('tags', 'name color')
                                        .sort({ date: -1 });
        res.status(200).json(movements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear un movimiento
// @route   POST /api/movements
// @access  Private
const createMovement = async (req, res) => {
    const { account: accountId, type, amount, description, tags, date } = req.body;

    if (!accountId || !type || !amount || !description) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        const account = await Account.findById(accountId);

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        // Crear el movimiento
        const movement = await Movement.create({
            user: req.user.id,
            account: accountId,
            type,
            amount: Number(amount),
            currency: account.currency,
            description,
            tags: tags || [],
            date: date || Date.now()
        });

        // Actualizar balance de la cuenta
        if (type === 'Entrada') {
            account.balance += Number(amount);
        } else if (type === 'Salida') {
            account.balance -= Number(amount);
        }
        await account.save();

        res.status(201).json(movement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Actualizar movimiento (solo descripción, fecha y tags)
// @route   PUT /api/movements/:id
// @access  Private
const updateMovement = async (req, res) => {
    try {
        const movement = await Movement.findById(req.params.id);

        if (!movement) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        if (movement.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        const { description, tags, date } = req.body;
        
        if (description) movement.description = description;
        if (tags) movement.tags = tags;
        if (date) movement.date = date;

        const updatedMovement = await movement.save();
        res.status(200).json(updatedMovement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Eliminar movimiento
// @route   DELETE /api/movements/:id
// @access  Private
const deleteMovement = async (req, res) => {
    try {
        const movement = await Movement.findById(req.params.id);

        if (!movement) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        if (movement.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        // Revertir balance
        const account = await Account.findById(movement.account);
        if (account) {
            if (movement.type === 'Entrada') {
                account.balance -= movement.amount;
            } else if (movement.type === 'Salida') {
                account.balance += movement.amount;
            }
            await account.save();
        }

        await movement.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMovements,
    createMovement,
    updateMovement,
    deleteMovement
};
