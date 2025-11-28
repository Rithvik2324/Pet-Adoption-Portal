const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// Request adoption (public)
router.post('/', async (req,res) => {
  try {
    const { petId, adopterName, adopterEmail, adopterPhone, message } = req.body;
    if (!petId || !adopterName) return res.status(400).json({ message: 'Missing fields' });
    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    if (pet.adopted) return res.status(400).json({ message: 'Pet already adopted' });
    const ad = new Adoption({ pet: petId, adopterName, adopterEmail, adopterPhone, message });
    await ad.save();
    res.status(201).json(ad);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: list adoption requests
router.get('/', authMiddleware, adminOnly, async (req,res) => {
  try {
    const list = await Adoption.find().populate('pet').sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: approve/reject adoption
router.post('/:id/decision', authMiddleware, adminOnly, async (req,res) => {
  try {
    const { action } = req.body; // 'approve' or 'reject'
    const ad = await Adoption.findById(req.params.id).populate('pet');
    if (!ad) return res.status(404).json({ message: 'Adoption not found' });
    if (action === 'approve') {
      ad.status = 'approved';
      ad.pet.adopted = true;
      await ad.pet.save();
      await ad.save();
      return res.json(ad);
    } else if (action === 'reject') {
      ad.status = 'rejected';
      await ad.save();
      return res.json(ad);
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
