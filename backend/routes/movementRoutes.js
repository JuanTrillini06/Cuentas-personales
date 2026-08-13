const express = require('express');
const router = express.Router();
const { getMovements, createMovement, updateMovement, deleteMovement } = require('../controllers/movementController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getMovements).post(protect, createMovement);
router.route('/:id').put(protect, updateMovement).delete(protect, deleteMovement);

module.exports = router;
