const User = require('../models/user.models');

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

module.exports = { getAllUsers };
