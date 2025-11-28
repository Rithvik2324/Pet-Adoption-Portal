const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  type: { type: String, required: true, index: true }, // Dog, Cat, Other
  age: { type: Number, default: 0 },
  breed: { type: String, index: true },
  description: { type: String },
  image: { type: String }, // cloudinary url
  adopted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Pet', PetSchema);
