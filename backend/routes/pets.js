const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pet_adopt_images',
    allowed_formats: ['jpg','png','jpeg']
  }
});
const upload = multer({ storage });

// Create pet (admin only)
router.post('/', authMiddleware, adminOnly, upload.single('image'), async (req,res) => {
  try {
    const { name, type, age, breed, description } = req.body;
    const image = req.file?.path || req.body.image || '';
    const pet = new Pet({ name, type, age: Number(age||0), breed, description, image });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Update pet (admin)
router.put('/:id', authMiddleware, adminOnly, upload.single('image'), async (req,res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    const { name, type, age, breed, description } = req.body;
    if (req.file?.path) pet.image = req.file.path;
    if (name) pet.name = name;
    if (type) pet.type = type;
    if (age) pet.age = Number(age);
    if (breed) pet.breed = breed;
    if (description) pet.description = description;
    await pet.save();
    res.json(pet);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete pet (admin)
router.delete('/:id', authMiddleware, adminOnly, async (req,res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get single pet
router.get('/:id', async (req,res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// List pets with search, filter, pagination
// Query params: q (search name/breed), type, adopted, page, limit, sort
router.get('/', async (req,res) => {
  try {
    const { q, type, adopted, page = 1, limit = 12, sort = '-createdAt' } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { breed: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
    if (type) filter.type = type;
    if (adopted === 'true' || adopted === 'false') filter.adopted = adopted === 'true';
    const skip = (Number(page)-1) * Number(limit);
    const total = await Pet.countDocuments(filter);
    const pets = await Pet.find(filter).sort(sort).skip(skip).limit(Number(limit));
    res.json({ total, page: Number(page), pages: Math.ceil(total/limit), limit: Number(limit), pets });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
