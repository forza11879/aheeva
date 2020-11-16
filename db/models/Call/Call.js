import mongoose from 'mongoose';

const ParentSchema = new mongoose.Schema({
  _id: true,
  duration: {
    type: Number,
    required: true,
  },
});

export const Call = mongoose.model('Call', ParentSchema);
