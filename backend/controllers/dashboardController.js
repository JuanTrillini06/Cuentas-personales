const Movement = require('../models/Movement');
const Account = require('../models/Account');

// @desc    Obtener datos resumidos para el dashboard
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Obtener balances totales agrupados por moneda
        const accounts = await Account.find({ user: userId });
        const balancesByCurrency = accounts.reduce((acc, account) => {
            if (!acc[account.currency]) {
                acc[account.currency] = 0;
            }
            acc[account.currency] += account.balance;
            return acc;
        }, {});

        // 2. Agrupar gastos (Salidas) por categoría para el gráfico de torta
        const movements = await Movement.find({ user: userId, type: 'Salida' }).populate('tags');
        
        const expensesByCategory = movements.reduce((acc, movement) => {
            const tagName = movement.tags.length > 0 ? movement.tags[0].name : 'Sin etiqueta';
            const color = movement.tags.length > 0 ? movement.tags[0].color : '#999999';
            const currency = movement.currency;
            
            if (!acc[currency]) {
                acc[currency] = {};
            }
            if (!acc[currency][tagName]) {
                acc[currency][tagName] = { amount: 0, color: color };
            }
            acc[currency][tagName].amount += movement.amount;
            return acc;
        }, {});

        res.status(200).json({
            balancesByCurrency,
            expensesByCategory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardData };
