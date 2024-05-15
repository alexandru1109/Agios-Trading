import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
    history: {
      type: Array, 
      required: false,
    },
    indicators: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Market = mongoose.model('Market', marketSchema);

export default Market;
