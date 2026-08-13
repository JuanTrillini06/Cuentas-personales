const Account = require('../models/Account');

// @desc    Obtener cuentas del usuario
// @route   GET /api/accounts
// @access  Private
const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ user: req.user.id });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear una cuenta
// @route   POST /api/accounts
// @access  Private
const createAccount = async (req, res) => {
    const { name, bank, currency, initialBalance } = req.body;

    if (!name || !bank || !currency) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        const balance = initialBalance ? Number(initialBalance) : 0;
        
        const account = await Account.create({
            name,
            bank,
            currency,
            initialBalance: balance,
            balance: balance,
            user: req.user.id
        });
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Actualizar cuenta
// @route   PUT /api/accounts/:id
// @access  Private
const updateAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        // Evitar actualizar el balance directamente por esta vía
        const { name, bank, currency } = req.body;

        account.name = name || account.name;
        account.bank = bank || account.bank;
        account.currency = currency || account.currency;

        const updatedAccount = await account.save();
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Eliminar cuenta
// @route   DELETE /api/accounts/:id
// @access  Private
const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        await account.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount
};
