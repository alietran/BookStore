const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    unique: true,
  },
  explain: {
    type: String,
    default: '',
  },
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
