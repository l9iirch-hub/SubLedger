const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validations/user.validation');

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function register(req, res) {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await user.save();
    res.status(201).json({ token: generateToken(user._id) });

  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

async function login(req, res) {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ token: generateToken(user._id) });

  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

function profile(req, res) {
  res.json(req.user);
}

module.exports = { register, login, profile };
