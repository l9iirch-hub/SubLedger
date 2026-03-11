const express = require('express');
const router = express.Router();

const { register, login, profile } = require('../controllers/user.controller'); // <- plural
const validate = require('../middlewares/validation.middleware');
const { registerValidation, loginValidation } = require('../validations/user.validation');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/profile', authMiddleware, profile);

module.exports = router;
