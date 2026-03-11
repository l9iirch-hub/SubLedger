const express = require('express');
const router = express.Router();

const { createSub, getSubs, getSub, updateSub, deleteSub } = require('../controllers/sub.controller');
const validate = require('../middlewares/validation.middleware');
const { createSubValidation } = require('../validations/sub.validations');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', validate(createSubValidation), createSub);
router.get('/', getSubs);
router.get('/:id', getSub);
router.put('/:id', validate(createSubValidation), updateSub);
router.delete('/:id', deleteSub);

module.exports = router;
