const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { subValidation } = require('../validations/sub.validations');
const { createSub, getSubs, getSub, updateSub, deleteSub } = require('../controllers/sub.controller');

router.post('/', auth, validate(subValidation), createSub);
router.get('/', auth, getSubs);
router.get('/:id', auth, getSub);
router.put('/:id', auth, validate(subValidation), updateSub);
router.delete('/:id', auth, deleteSub);

module.exports = router;
