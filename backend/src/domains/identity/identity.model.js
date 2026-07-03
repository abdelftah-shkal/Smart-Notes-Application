/**
 * Workspace Flow — Identity Model
 * @author Abdelfatah
 * Represents an application user. Collection name: 'users' (compatible with original DB).
 */

const mongoose = require('mongoose');

const identitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
    // Keep original collection name for DB compatibility
    collection: 'users',
  }
);

// Remove password from any JSON output
identitySchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const IdentityModel = mongoose.model('Identity', identitySchema);

module.exports = IdentityModel;
