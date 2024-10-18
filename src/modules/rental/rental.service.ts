import { Request } from 'express';
import { Bike } from '../bike/bike.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Rental } from './rental.model';
import mongoose from 'mongoose';
import { initiatePayment } from '../payment/payment.utils';

//* create rental
const createRentalIntoDB = async (req: Request) => {
  // getting data from the req body
  const rentalInfo = req.body;

  // checking if the bike is in db or not
  const isBikeExists = await Bike.findById(rentalInfo.bikeId);
  if (!isBikeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  // checking if the bike is available or not
  const isBikeAvailable = isBikeExists.isAvailable;
  if (!isBikeAvailable) {
    throw new AppError(httpStatus.FORBIDDEN, 'Bike is already rented');
  }

  // getting the user id, email and role from auth
  const authUser = req.user;

  // setting user info into rentalInfo
  rentalInfo.userId = authUser.userId;

  // we will use session because of more than one write operation
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // set bike not available (write operation-01)
    const setBikeNotAvailable = await Bike.findByIdAndUpdate(
      rentalInfo.bikeId,
      {
        isAvailable: false,
      },
      session,
    );
    if (!setBikeNotAvailable) {
      throw new AppError(
        httpStatus.NOT_MODIFIED,
        'Error updating bike availability',
      );
    }

    // create and add transactionId
    const transactionId = `TXN-${Date.now()}`;
    rentalInfo.transactionId = transactionId;

    // create rental (write operation-02)
    const result = await Rental.create([rentalInfo], { session: session });
    if (!result) {
      throw new AppError(
        httpStatus.NOT_IMPLEMENTED,
        'Error in creating rental',
      );
    }

    //! payment
    const paymentData = {
      transactionId,
      totalCost: 100,
      customerEmail: authUser.email,
    };

    const paymentSession = await initiatePayment(paymentData);

    // commit transaction
    await session.commitTransaction();
    // end session
    await session.endSession();

    return { result, paymentSession };
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Error creating rental');
  }
};

//* return rental
const returnRentalIntoDB = async (id: string) => {
  // check if rental bike exists
  const isRentalExists = await Rental.findById(id);
  if (!isRentalExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rental not found');
  }

  // get the bike
  const bike = await Bike.findById(isRentalExists.bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  // get the start time from the rental
  const startTime = new Date(isRentalExists.startTime);

  // return time (current time)
  const returnTime = new Date();

  // throw error if start time is not before return time
  if (startTime >= returnTime) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Start time must be before return time',
    );
  }

  // time difference between startTime and endTime
  const timeDifference = Math.ceil(
    (returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60),
  );

  // taking the price per hour of the bike
  const pricePerHour = bike.pricePerHour;

  // calculating the total cost
  const totalCost = timeDifference * pricePerHour - 100;

  // we will use session because of more than one write operation
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // update the rental with returnTime, totalCost and isReturned true(write-01)
    const updateRental = await Rental.findByIdAndUpdate(
      id,
      {
        returnTime: returnTime,
        totalCost: totalCost,
        isReturned: true,
      },
      { new: true },
    ).session(session);

    // if error happens during update rental operation
    if (!updateRental) {
      throw new AppError(
        httpStatus.NOT_IMPLEMENTED,
        'Error in updating rental',
      );
    }

    // update bike isAvailable to true(write-02)
    const updateBikeAvailability = await Bike.findByIdAndUpdate(
      isRentalExists.bikeId,
      { isAvailable: true },
    ).session(session);

    if (!updateBikeAvailability) {
      throw new AppError(
        httpStatus.NOT_IMPLEMENTED,
        'Error in updating bike availability',
      );
    }

    // commit transaction
    await session.commitTransaction();
    // end session
    await session.endSession();

    return updateRental;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.NOT_IMPLEMENTED,
      'Error updating return rental',
    );
  }
};

//* get all rentals for logged in user(my rental)
const getAllRentalsOfUserFromDB = async (req: Request) => {
  // getting the signed in user id, email and role from auth
  const authUser = req.user;
  const result = await Rental.find({ userId: authUser.userId });
  return result;
};

//* get all rentals for admin dashboard
const getAllRentalsFromDB = async () => {
  const result = await Rental.find();
  return result;
};

//* full payment for my-rentals

export const RentalServices = {
  createRentalIntoDB,
  returnRentalIntoDB,
  getAllRentalsOfUserFromDB,
  getAllRentalsFromDB,
};
