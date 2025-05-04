const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['parent', 'child'],
      default: 'child',
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function() {
        return this.role === 'child';  // Only children will have a parentId
      },
    },
    pocketMoney: {
      type: Number,
      default: 0,  // Initial pocket money for children
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Hash password before saving to database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);  // Hash password
    next();
  } catch (error) {
    next(error);  // Pass error to next middleware
  }
});

// Compare input password with stored hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
