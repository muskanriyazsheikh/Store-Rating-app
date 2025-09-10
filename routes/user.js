// routes/user.js
const express = require('express');
const router = express.Router();
const { Store, Rating, User } = require('../models');
const { authenticate } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { fn, col } = require('sequelize');

// List stores (public)
router.get('/stores', authenticateOptional, async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: [
        'id','name','email','address',
        [fn('AVG', col('Ratings.rating')), 'avgRating']
      ],
      include: [{ model: Rating, attributes: [] }],
      group: ['Store.id'],
    });

    const userRatings = {};
    if (req.user) {
      const myRatings = await Rating.findAll({ where: { userId: req.user.id } });
      myRatings.forEach(r => userRatings[r.storeId] = r.rating);
    }

    const result = stores.map(s => ({
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      avgRating: parseFloat(s.get('avgRating')) || 0,
      myRating: userRatings[s.id] || null
    }));
    res.json({ stores: result });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Submit rating
router.post('/stores/:id/rate', authenticate,
  body('rating').isInt({ min: 1, max: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const storeId = parseInt(req.params.id);
    const { rating } = req.body;
    try {
      const existing = await Rating.findOne({ where: { userId: req.user.id, storeId } });
      if (existing) {
        existing.rating = rating;
        await existing.save();
        return res.json({ message: 'Rating updated', rating: existing });
      } else {
        const r = await Rating.create({ userId: req.user.id, storeId, rating });
        return res.json({ message: 'Rating submitted', rating: r });
      }
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  }
);

module.exports = router;

// helper: authenticate optional
function authenticateOptional(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return next();
  const token = auth.split(' ')[1];
  const jwt = require('jsonwebtoken');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
  } catch (err) {
    // ignore invalid token
  }
  return next();
}
