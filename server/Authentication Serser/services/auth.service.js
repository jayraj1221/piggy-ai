const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.registerParent = async ({ name, email, password }) => {
    
  const existingUser = await User.findOne({ email });
  if (existingUser) throw { statusCode: 400, message: 'User already exists' };

  const parent = new User({ name, email, password, role: 'parent' });
  await parent.save();

  const token = generateToken(parent);

  return {
    message: 'Parent registered successfully',
    user: {
      id: parent._id,
      name: parent.name,
      email: parent.email,
      role: parent.role,
    },
    token,
  };
};

exports.registerChild = async ({ name, email, password }, parent) => {
  
  if (!parent || parent.role !== 'parent') {
    throw { statusCode: 400, message: 'Invalid parent ID' };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw { statusCode: 400, message: 'Email already in use' };

  const child = new User({ name, email, password, role: 'child', parentId : parent._id });
  await child.save();

  const token = generateToken(child);

  return {
    message: 'Child registered successfully',
    user: {
      id: child._id,
      name: child.name,
      email: child.email,
      role: child.role,
      parentId: child.parentId,
    },
    token,
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { statusCode: 400, message: 'User not found' };

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw { statusCode: 401, message: 'Invalid credentials' };

  const token = generateToken(user);

  return {
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      parentId: user.parentId || null,
    },
    token,
  };
};
