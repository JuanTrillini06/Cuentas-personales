const express = require('express');
const router = express.Router();
const { getTags, createTag, updateTag, deleteTag } = require('../controllers/tagController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getTags).post(protect, createTag);
router.route('/:id').put(protect, updateTag).delete(protect, deleteTag);

module.exports = router;
