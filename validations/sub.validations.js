const Joi = require('joi');

const subValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    billingCycle: Joi.string().valid('monthly', 'yearly').required()
});

module.exports = { subValidation };
