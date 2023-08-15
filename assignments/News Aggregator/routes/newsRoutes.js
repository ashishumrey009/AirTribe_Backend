// src/routes/newsRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.get('/preferences', authMiddleware.authenticate, newsController.getUserPreferences);
router.put('/preferences', authMiddleware.authenticate, newsController.updateUserPreferences);
router.get('/', authMiddleware.authenticate, newsController.getNewsArticles);

module.exports = router;
