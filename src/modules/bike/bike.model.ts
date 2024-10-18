import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>({
  name: {
    type: String,
    required: [true, 'Bike model name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Bike description is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Bike Image URL is required'],
    trim: true,
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Bikes price per hour is required'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: [true, 'Bike availability is required'],
  },
  cc: {
    type: Number,
    required: [true, 'Bike cc is required'],
  },
  year: {
    type: Number,
    required: [true, 'Bikes year is required'],
  },
  model: {
    type: String,
    required: [true, 'Bike model is required'],
  },
  brand: {
    type: String,
    required: [true, 'Bikes brand is required'],
  },
});

export const Bike = model<TBike>('Bike', bikeSchema);
