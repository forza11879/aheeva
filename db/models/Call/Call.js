import mongoose from 'mongoose';

const ParentSchema = new mongoose.Schema({
  duration: {
    type: Number,
    // required: [true, 'Please add call duration'],
    // trim: true,
  },
});

export const Call = mongoose.model('Call', ParentSchema);
