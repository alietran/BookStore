const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      enum: ['admin', 'guest', 'customer', 'staff'],
      unique: true,
    },
    explain: {
      type: String,
      default: '',
    },
  },
  
);

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
