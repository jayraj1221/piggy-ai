const authService = require('../services/auth.service');

exports.registerParent = async (req, res) => {
  try {
    const result = await authService.registerParent(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error registering parent:', error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
  }
};

exports.registerChild = async (req, res) => {
  try {
    const result = await authService.registerChild(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error registering child:', error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
  }
};
