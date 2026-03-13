const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const { getUsers } = require('../controllers/admin.controller');

router.get('/users', auth, role('admin'), getUsers);

module.exports = router;
