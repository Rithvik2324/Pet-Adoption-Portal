const mongoose = require('mongoose');
const AdoptionSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  adopterName: { type: String, required: true },
  adopterEmail: { type: String },
  adopterPhone: { type: String },
  message: { type: String },
  status: { type: String, enum: ['requested','approved','rejected'], default: 'requested' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Adoption', AdoptionSchema);
