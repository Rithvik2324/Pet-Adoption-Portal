const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single pet
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE pet
router.post('/', async (req, res) => {
  try {
    const { name, type, age, breed, description, image } = req.body;
    const pet = new Pet({ name, type, age, breed, description, image });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE pet
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADOPT pet (partial update: set adopted true and adopter name)
router.post('/:id/adopt', async (req, res) => {
  try {
    const adopter = req.body.adopter || 'Anonymous';
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    if (pet.adopted) return res.status(400).json({ message: 'Pet already adopted' });
    pet.adopted = true;
    pet.adoptedBy = adopter;
    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE pet
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
