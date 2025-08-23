import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  price: { type: Number, required: true, min: 0 },
  categories: { type: [String], default: [], index: true },
  available: { type: Boolean, default: true },
}, { timestamps: true });

PlantSchema.index({ name: 'text', categories: 'text' });

export default mongoose.model('Plant', PlantSchema);
