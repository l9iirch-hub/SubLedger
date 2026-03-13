const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(req.body);
    console.log(error);
    
    if (error) return res.status(400).json({ message: error.details[0].message,error });
    next();
};

module.exports = validate;
