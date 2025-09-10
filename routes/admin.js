// routes/admin.js
const express = require('express');
const router = express.Router();
const { User, Store, Rating } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { Op, fn, col } = require('sequelize');

// Protect all admin routes
router.use(authenticate, authorize('admin'));

// Dashboard counts
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Add new user (admin can create admin/owner/user)
router.post('/users',
  body('name').isLength({ min: 3, max: 60 }).withMessage('Name 3–60 chars'),
  body('email').isEmail(),
  body('password').matches(/(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}/),
  body('role').isIn(['admin','user','owner']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, email, password, address, role } = req.body;
    try {
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(400).json({ message: 'Email exists' });

      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hash, address, role });

      res.json({
        message: 'User created',
        user: { id: user.id, email: user.email, role: user.role }
      });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  }
);

// Add new store (admin)
router.post('/stores',
  body('name').notEmpty(),
  body('ownerId').isInt().optional({ nullable: true }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, email, address, ownerId } = req.body;
    try {
      const store = await Store.create({ name, email, address, ownerId: ownerId || null });
      res.json({ message: 'Store created', store });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  }
);

module.exports = router;
