const express = require('express');
const router = express.Router();
const { getAccounts, createAccount, updateAccount, deleteAccount } = require('../controllers/accountController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getAccounts).post(protect, createAccount);
router.route('/:id').put(protect, updateAccount).delete(protect, deleteAccount);

module.exports = router;
