import { Schema, model } from 'mongoose';
import { TRental } from './rental.interface';


const rentalSchema = new Schema<TRental>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is required'],
    unique: true,
    ref: 'User',
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Bike',
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  transactionId: {
    type: String,
    default: null,
  },
});

export const Rental = model<TRental>('Rental', rentalSchema);
