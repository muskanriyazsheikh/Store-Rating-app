// routes/owner.js
const express = require('express');
const router = express.Router();
const { Store, Rating, User } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { fn, col } = require('sequelize');

router.use(authenticate, authorize('owner'));

// list ratings for store owned by current owner
router.get('/stores/:storeId/ratings', async (req, res) => {
  const storeId = parseInt(req.params.storeId);
  try {
    const store = await Store.findOne({ where: { id: storeId, ownerId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'Store not found or not owned by you' });
    const ratings = await Rating.findAll({ where: { storeId }, include: [{ model: User, attributes: ['id','name','email'] }] });
    res.json({ store: { id: store.id, name: store.name }, ratings });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// average rating for an owned store
router.get('/stores/:storeId/average', async (req, res) => {
  const storeId = parseInt(req.params.storeId);
  try {
    const store = await Store.findOne({ where: { id: storeId, ownerId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'Store not found or not owned by you' });
    const avg = await Rating.findAll({
      where: { storeId },
      attributes: [[fn('AVG', col('rating')), 'avgRating']]
    });
    const avgVal = parseFloat(avg[0].get('avgRating')) || 0;
    res.json({ store: { id: store.id, name: store.name }, avgRating: avgVal });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
