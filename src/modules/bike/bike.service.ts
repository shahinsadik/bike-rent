import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

//* create bike into db
const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};


//* get all bike from db
const getAllBikesFromDB = async () => {
  const result = await Bike.find();
  return result;
};

//* get single bike from db
const getSingleBikeFromDB = async (id: string) => {
  const bike = await Bike.findById(id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }
  return bike;
};

//* update bike into db
const updateBikeIntoDB = async (id: string, updateData: object) => {
  const bike = await Bike.findById(id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }
  const result = await Bike.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Could not update bike');
  }
  return result;
};

//* delete bike from db
const deleteBikeFromDB = async (id: string) => {
  // step01: First update isAvailable to false
  const updatedBike = await Bike.findByIdAndUpdate(id, { isAvailable: false });
  if (!updatedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  // step02: delete the bike
  const result = await Bike.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Could not delete bike');
  }
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
