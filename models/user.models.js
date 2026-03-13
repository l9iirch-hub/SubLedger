const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});


// Compare password
userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);
