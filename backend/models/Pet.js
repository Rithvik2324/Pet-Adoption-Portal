const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // dog/cat/other
  age: { type: Number, default: 0 },
  breed: { type: String },
  description: { type: String },
  image: { type: String }, // URL
  adopted: { type: Boolean, default: false },
  adoptedBy: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', PetSchema);
